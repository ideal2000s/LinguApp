# frozen_string_literal: true

module Admin
  class StudentsController < ApplicationController
    def index
      authorize_action
      collection = scope.includes(:active_target_language)
      respond_to do |f|
        f.html { render :index, locals: { students: collection.page(params[:page]) } }
        f.js { render :index, locals: { students: collection.page(params[:page]) } }
        f.json { render :index, locals: { students: collection.search(params[:q]).page(params[:page]) } }
      end
    end

    def show
      sessions = student.lesson_sessions.includes(:lesson).order(created_at: :desc)
      authorize_action(student)
      render :show, locals: { student: student, sessions: sessions }
    end

    def create
      authorize_action
      student = Student.create(student_params)
      respond_to do |format|
        if student.save
          format.html { redirect_to edit_admin_student_path(student.id) }
        else
          format.html { render :new, locals: { student: student } }
        end
      end
    end

    def new
      authorize_action
      student = Student.new
      student.student_support_languages.build(native: true)
      render :new, locals: { student: student }
    end

    def edit
      authorize_action(student)
      render :edit, locals: { student: student }
    end

    def update
      authorize_action(student)
      if student.update(student_params)
        redirect_to edit_admin_student_path, notice: I18n.t('admin.update_msg')
      else
        render :edit, locals: { student: student }, status: :unprocessable_entity
      end
    end

    def destroy
      authorize_action
      student.discard
      respond_to do |format|
        format.html { redirect_to admin_students_path, notice: I18n.t('admin.discard_msg') }
      end
    end

    private

    def student
      @student ||= scope.find(params[:id])
    end

    def authorize_action(record = Student)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::StudentPolicy
    end

    def scope
      policy_scope(Student, policy_scope_class: Admin::StudentPolicy::Scope)
    end

    def student_params
      params.require(:student).permit(
        :email, :fname, :lname, :mobile, :locale, :gender, :ssn,
        student_target_languages_attributes: %i[id language_id level active],
        student_support_languages_attributes: %i[id language_id native], school_team_ids: []
      )
    end
  end
end
