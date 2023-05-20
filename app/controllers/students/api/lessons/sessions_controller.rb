# frozen_string_literal: true

module Students::API
  module Lessons
    class SessionsController < ApplicationController
      include LessonSessionFinders

      def create
        authorize_action
        result = Flows::CreateLessonSession.call(lesson: lesson, student: current_student)
        if result.success?
          render :show, locals: { lesson_session: result.value[:lesson_session] }
        else
          render json: { error: result.value }, status: :unprocessable_entity
        end
      end

      def show
        authorize_action
        render :show, locals: { lesson_session: lesson_session }
      end

      def self.local_prefixes
        ['students/api/lesson_sessions']
      end

      private

      def authorize_action(record = lesson)
        authorize(record, 'any?', policy_class: policy_class)
      end

      def policy_class
        Students::TaskPolicy
      end
    end
  end
end
