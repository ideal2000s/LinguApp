# frozen_string_literal: true

module School
  class TeamGroupsController < ApplicationController # rubocop:disable Metrics/ClassLength
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    def index
      authorize_action
      @search = scope.reorder('UPPER(name)').includes(:team_students).ransack(params[:q])
      render :index, locals: { team_groups: @search.result }
    end

    def create
      authorize_action
      team_group = team_groups_scope.new(team_group_params)
      if team_group.save
        redirect_to school_team_groups_path
      else
        render :new, locals: { team_group: team_group }
      end
    end

    def edit
      authorize_action
      render :edit, locals: { team_group: team_group, students: team_group.students }
    end

    def new
      authorize_action
      team_group = team_groups_scope.new
      render :new, locals: { team_group: team_group }
    end

    def update
      authorize_action
      team_group.update(team_group_params)
      render :update, locals: { team_group: team_group, students: team_group.students }
    end

    def destroy
      authorize_action(team_group)
      team_group.discard
      redirect_to school_students_path
    end

    def archive
      authorize_action
      team_group.archive_group
      redirect_to school_team_groups_path
    end

    def unarchive
      authorize_action(team_group)
      team_group.unarchive!
      redirect_to school_students_path
    end

    def edit_plan
      authorize_action(team_group)
      render :edit_plan, locals: { team_group: team_group, plans: team_group.language.plans }
    end

    def update_plan
      authorize_action(team_group)
      if params[:plan_id].present?
        ::School::AddTeamGroupPlanJob.perform_later(current_user, team_group.id, params[:plan_id])
        redirect_to school_team_groups_path, notice: I18n.t('school.team_students.profile.license_in_progress')
      else
        redirect_to school_team_groups_path, alert: I18n.t('school.team_students.profile.plan_is_not_selected')
      end
    end

    def toggle_joinable
      team_group.toggle!(:joinable)

      render json: { joinable: team_group.joinable }
    end

    # GET/POST /school/team_group/:id/assign_course
    def assign_course
      authorize_action(team_group)
      return render_assign_course unless request.post?

      course = Course.find(params[:course_id])
      course.team_groups << team_group
      course.team_students << team_group_students
      create_assign_course_activity
      flash.now[:notice] = t('.assigned', course: course.title, group: team_group.name)
      render 'assign_course', locals: { team_group: team_group }
    end

    def create_assign_course_activity
      team_group.create_activity(:course_assign,
                                 owner: current_user,
                                 recipient: team_group.team,
                                 parameters: { course: Course.find(params[:course_id])&.title })
      team_group_students.find_each do |e|
        e.create_activity(:course_assign,
                          owner: current_user,
                          recipient: e.student,
                          parameters: { course: Course.find(params[:course_id])&.title })
      end
    end

    private

    def authorize_action(record = TeamGroup)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::TeamGroupPolicy
    end

    def scope
      policy_scope(team_groups_scope, policy_scope_class: School::TeamGroupPolicy::Scope)
    end

    def school_students_scope
      current_team.students
    end

    def courses
      Course.published.by_language(team_group.language)
    end

    def team_group
      @team_group ||= team_groups_scope.find(params[:id])
    end

    def team_group_students
      @team_group_students ||= team_group.team_students
    end

    def team_user
      @team_user ||= current_team.team_users.find_by(user: current_user)
    end

    def team_groups_scope
      current_team.team_groups
    end

    def team_group_params
      params.require(:team_group).permit(:name, :language_id, :level, :joinable)
    end

    def render_assign_course
      render :assign_course, locals: {
        courses: courses,
        team_group: team_group,
        current_course_id: team_group.course_id
      }
    end

    def not_found
      flash.now[:alert] = t('.errors.course_not_selected')
      render
    end
  end
end
