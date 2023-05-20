# frozen_string_literal: true

module Teach
  class LessonSplitsController < ApplicationController
    def new
      authorize(lesson, :split?, policy_class: Teach::LessonPolicy)
      render lesson.kind, locals: { lesson: lesson, tasks: lesson.tasks.kept }
    end

    def create
      authorize(lesson, :split?, policy_class: Teach::LessonPolicy)
      result = Teach::Lessons::Cases::Split.call(lesson: lesson, params: lesson_params)

      if result.success?
        redirect_to teach_lesson_path(result.value), notice: t('admin.lessons.split.success')
      else
        redirect_to teach_lesson_path(lesson), error: t('admin.lessons.split.error')
      end
    end

    private

    def lesson
      @lesson ||= Lesson.find(params[:id])
    end

    def lesson_params
      params.require(:lesson).permit(:title, task_ids: [])
    end
  end
end
