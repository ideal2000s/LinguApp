# frozen_string_literal: true

module School
  class TeamStudentsController < ApplicationController # rubocop:disable Metrics/ClassLength
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    def index
      authorize_action
      team_students = current_team.team_students.unarchived
                                  .includes(team_group: { language: :plans }, active_license: :plan, student:
                                            %i[active_target_language active_student_target_language
                                               native_language native_support_language])
                                  .order('students.lname')
      @search = team_students.ransack(params[:q])
      render :index, locals: { team_students: @search.result,
                               available_plans: current_team.team_students.available_plans_by_team(current_team) }
    end

    def show
      authorize_action(student)
      @search = student.lesson_sessions.ransack(params[:q])
      render :lessons, locals: {
        course: team_student.course,
        lesson_sessions: @search.result.order(created_at: :desc),
        student: student,
        search_lessons: student_lessons_scope.includes(:language)
      }
    end

    def create # rubocop:disable Metrics/MethodLength
      authorize_action
      result = School::Students::Flows::Create.call(current_user: current_user,
                                                    current_team: current_team,
                                                    scope: school_students_scope,
                                                    student_params: create_params,
                                                    params: params)
      if result.success?
        render :form_submit
      else
        render :new, locals: { student: result.value[:student] }
      end
    end

    def new
      authorize_action
      return unless gdpr_consented?

      student = school_students_scope.new
      student.student_target_languages.build(active: true)
      student.student_support_languages.build(native: true)
      render :new, locals: { student: student }
    end

    def edit
      authorize_action(student)
      respond_to do |format|
        format.js { render :edit, locals: { student: student } }
      end
    end

    def update
      authorize_action(student)
      if student.update(student_params)
        respond_to do |format|
          format.js { render js: "window.location.href='#{request.referer}'" }
        end
      else
        render :edit, locals: { student: student }
      end
    end

    def destroy
      authorize_action
      student.discard!
      respond_to do |format|
        format.html { redirect_to school_students_path, notice: I18n.t('admin.discard_msg') }
      end
    end

    def archive
      authorize_action
      team_student.archive!
      respond_to do |format|
        format.js { render js: "window.location.href='#{school_students_path}'" }
      end
    end

    def archived_students
      authorize_action
      @search = current_team.team_students
                            .includes(student: %i[active_target_language active_student_target_language
                                                  native_language native_support_language])
                            .archived
                            .ransack(params[:q])
      render :archived_students, locals: { team_students: @search.result, team: current_team }
    end

    def clear_archive
      authorize_action
      current_team.team_students.archived.each(&:discard!)
      render :clear_archive
    end

    def restore_student
      authorize_action(student)
      team_student.unarchive!
      render :restore_student, locals: { student: student }
    end

    def remove_student
      authorize_action(student)
      team_student.discard!
      render :remove_student, locals: { student: student }
    end

    def assign_team_group
      authorize_action(student)
      team_student.update!(team_group: team_group)
      team_student.create_activity(:group_assign, owner: current_user, recipient: student)
      update_course_assign if team_group.course
    end

    def assign_course
      authorize_action(student)
      return render_assign_course unless request.post?

      course = Course.find(params[:course_id])
      course.team_students << team_student
      create_course_assign_activity
      flash.now[:notice] = t('.assigned', course: course.title, student: student.full_name)
      render 'assign_course', locals: { course: course }
    end

    def import_students
      authorize_action
      return unless gdpr_consented?

      render :import_students
    end

    def analyze_imported_file
      authorize_action
      result = ImportFileAnalyzer.analyze(file_param: params[:file])
      render :analyze_imported_file, layout: nil, locals: {
        file_name: result[:original_file_name],
        students: result[:users],
        errors: result[:errors]
      }
    end

    def create_batch
      authorize_action
      ::School::StudentsImporterJob.perform_later(current_user,
                                                  current_team,
                                                  students_params[:students],
                                                  params[:team_group_id],
                                                  params[:plan_id])
      redirect_to school_students_path,
                  notice: I18n.t('school.team_students.import_students.import_in_progress')
    end

    def invite_students
      authorize_action
      render :invite_students
    end

    def send_invitations # rubocop:disable Metrics/MethodLength
      authorize_action
      if params[:invitee_emails].present? && params[:invitee_emails].all?(&:present?)
        params[:invitee_emails].each do |invitee_email|
          InvitationMailer.send_invitation_by_email(current_team: current_team,
                                                    invitee_email: invitee_email,
                                                    team_group_id: params[:team_group_id],
                                                    plan_id: params[:plan_id]).deliver_now
        end
        redirect_to school_students_path, notice: I18n.t('school.team_students.invite_students.send_invitations_successfully')
      else
        redirect_to school_students_path, alert: I18n.t('school.team_students.invite_students.send_invitation_failed')
      end
    end

    def move_class
      authorize_action(student)
      render :move_class, locals: {
        team_groups: team_groups_scope.by_language(student.active_target_language),
        student: student,
        current_team_group_id: team_student(student).team_group_id
      }
    end

    def revoke_team_group
      authorize_action(student)
      team_student.update!(team_group: nil)
      render :revoke_team_group, locals: { student: student }
    end

    def lessons
      authorize_action(student)
      collection = student.lesson_sessions.order(created_at: :desc)
      @search = collection.ransack(params[:q])
      lesson_sessions = @search.result
      render :lessons, locals: {
        course: team_student.course,
        lesson_sessions: lesson_sessions,
        student: student,
        search_lessons: student_lessons_scope.includes(:language)
      }
    end

    def search_lessons
      lessons = student_lessons_scope.where('title ILIKE ?', "#{params[:title]}%")
      render :search_lessons, locals: { lessons: lessons }
    end

    def assign_lessons
      authorize_action(student)
      redirect_back(fallback_location: school_student_path(student))
    end

    def courses
      authorize_action(student)
      @assigned_course = team_student.course
      @other_courses = student.courses.where.not(id: @assigned_course&.id).distinct
      render :courses
    end

    def available_languages
      languages = Language.send(params[:scope] == 'target' ? 'active' : 'support').where.not(id: params[:language_ids].split(','))
      render json: {
        languages: languages.map do |l|
          ["#{helpers.asset_path("flags/#{helpers.language_to_flag_code(l.code)}.svg")}, #{l.system_name.strip}", l.id]
        end
      }
    end

    def build_language
      language = Language.find(params[:language_id])
      next_id = if student_language_scope.where(language: language).empty?
                  student_language_scope.count + params[:new_items_count].to_i
                else
                  student_language_scope.pluck(:language_id).index(params[:language_id].to_i)
                end
      render :build_language, locals: { student: student, language: language, next_id: next_id, scope: params[:scope] }
    end

    def remove_language
      render :remove_language, locals: { language_id: params[:language_id], student: student, scope: params[:scope] }
    end

    private

    def student
      @student ||= scope.find(params[:id])
    end

    def student_language_scope
      @student_language_scope ||= student.send("student_#{params[:scope]}_languages")
    end

    def team_student(current_student = student)
      @team_student ||= current_team.team_students.find_by(student: current_student)
    end
    helper_method :student
    helper_method :team_student

    def team_group
      @team_group ||= current_team.team_groups.find(params[:team_group_id])
    end

    def available_courses
      return nil unless student.active_target_language

      Course.published.by_language(student.active_target_language)
    end

    def update_course_assign
      team_student.update(course: team_group.course)
      create_course_assign_activity
    end

    def create_course_assign_activity
      team_student.create_activity(:course_assign,
                                   owner: current_user,
                                   recipient: student,
                                   parameters: { course: Course.find(params[:course_id])&.title })
    end

    def render_assign_course
      render :assign_course, locals: {
        courses: available_courses,
        student: student,
        current_course_id: team_student(student).course_id
      }
    end

    def authorize_action(record = Student)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::StudentPolicy
    end

    def scope
      policy_scope(school_students_scope, policy_scope_class: School::StudentPolicy::Scope)
    end

    def school_students_scope
      current_team.students.kept
    end

    def team_groups_scope
      current_team.team_groups.kept.unarchived
    end

    def student_lessons_scope
      Lesson.kept.by_language(student.active_target_language)
    end

    def student_params
      params.require(:student).permit(
        :email, :fname, :lname, :mobile, :locale, :gender, :ssn, :password,
        student_target_languages_attributes: %i[id language_id level active _destroy],
        student_support_languages_attributes: %i[id language_id native _destroy]
      )
    end

    def students_params
      params.permit(students: %i[fname lname email mobile gender ssn level native_language_data target_language_data valid])
    end

    def create_params
      student_params.tap do |hash|
        hash[:password] = password_generator if hash[:password].blank?
      end
    end

    def not_found
      flash.now[:alert] = t('school.team_groups.errors.course_not_selected')
      render
    end
  end
end
