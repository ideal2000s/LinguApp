# frozen_string_literal: true

module Students::API
  class LessonSessionsController < ApplicationController
    def show
      session = lesson_session || current_session
      authorize_action(lesson_session.lesson)

      if session.present?
        render :show, locals: { lesson_session: session }
      else
        render json: {}, status: :not_found
      end
    end

    private

    def lesson_scope
      Lesson.kept.published
    end

    def lesson
      @lesson ||= lesson_scope.find(params[:lesson_id])
    end

    def lesson_session_scope
      current_student.lesson_sessions
    end

    def current_session
      @current_session ||= LessonSession.find_session!(lesson: lesson, student: current_student)
    end

    def lesson_session
      return if params[:id].blank?

      @lesson_session ||= lesson_session_scope.find(params[:id])
    end

    def authorize_action(record = lesson)
      authorize(record, 'any?', policy_class: policy_class)
    end

    def policy_class
      Students::TaskPolicy
    end
  end
end
