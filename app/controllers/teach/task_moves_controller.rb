# frozen_string_literal: true

module Teach
  class TaskMovesController < ApplicationController
    def new
      authorize(lesson, :move_tasks?, policy_class: Teach::LessonPolicy)
      render lesson.kind, locals: { lesson: lesson, tasks: lesson.tasks.kept }
    end

    def create
      authorize(lesson, :move_tasks?, policy_class: Teach::LessonPolicy)
      if lesson_params.present?
        Task.where(id: lesson_params[:task_ids]).update(lesson_id: lesson_params[:id])
        redirect_to teach_lesson_path(lesson_params[:id])
      else
        render :new, locals: { lesson: lesson, tasks: lesson.tasks.kept }
      end
    end

    private

    def lesson
      Lesson.find(params[:id])
    end

    def lesson_params
      params.require(:lesson).permit(:id, task_ids: [])
    end
  end
end
