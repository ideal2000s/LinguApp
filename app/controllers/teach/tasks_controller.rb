# frozen_string_literal: true

module Teach
  class TasksController < ApplicationController
    layout 'authoring/clean'

    def new
      respond_to :js
      render :new, locals: { form: ::Tasks::CreateForm.new(subject: params[:subject]), lesson: lesson }
    end

    def create
      respond_to do |f|
        if (result = Tasks::Flows::Create.call(params: create_params)) && result.success?
          f.js { render js: "window.location='#{edit_teach_lesson_task_path(lesson, result.value[:task].id)}'" }
          f.html { redirect_to edit_teach_lesson_task_path(lesson, result.value[:task].id) }
        else
          f.any(:js, :html) { render :new, locals: { lesson: lesson, **result.value }, status: :unprocessable_entity }
        end
      end
    end

    def edit
      render :edit, locals: { task: task, lesson: lesson, form: task.form.new(default_params) }
    end

    def show
      redirect_to teach_task_preview_path(task)
    end

    def update
      respond_to do |f|
        if (result = Tasks::Flows::Update.call(task: task, params: update_params)) && result.success?
          f.html { redirect_to edit_teach_lesson_task_path(lesson, task), notice: I18n.t('admin.update_msg') }
          f.json { respond_with_bip(task) }
        else
          f.html { render :edit, locals: result.value }
          f.json { head :unprocessable_entity }
        end
      end
    end

    def position
      if params[:direction].present? # move inside section
        task.move_higher
      elsif params[:subject].present? # move between sections
        position = params[:position] == 'top' ? 0 : nil
        task.update(subject: params[:subject], position: position)
      end

      head :ok
    end

    def toggle_published
      task.toggle!(:published)
    end

    def destroy
      task.discard
      redirect_to teach_lesson_path(lesson), notice: I18n.t('teach.tasks.deleted_task_msg')
    end

    def delete_file_attachment
      respond_to :js
      file_params = {}
      file_params[:image] = nil if params.key?(:_delete_image)
      file_params[:audio] = nil if params.key?(:_delete_audio)
      task.update(file_params)
    end

    def convert_text_task_type
      task.convert_type
      redirect_to edit_teach_lesson_task_path(lesson, task), notice: I18n.t('teach.tasks.convert_text_task_msg')
    end

    private

    def default_params
      { task: task }
    end

    def create_params
      params.require(:task).permit(
        :name, :complexity, :type, :published, :score_method, :subject, :industry_id
      ).merge(lesson_id: lesson.id)
    end

    def update_params
      params
        .require(:task)
        .permit(*task.params_schema)
    end

    def authorize_action(record = lesson)
      authorize(record, 'edit?', policy_class: policy_class)
    end

    def policy_class
      Teach::LessonPolicy
    end

    def scope
      lesson.tasks.kept.original.order(id: :desc)
    end

    def task
      @task ||= scope.find(params[:id])
    end

    def lesson
      @lesson ||= lesson_scope.find(params[:lesson_id])
    end

    def lesson_scope
      policy_scope(Lesson, policy_scope_class: Teach::LessonPolicy::Scope)
    end
  end
end
