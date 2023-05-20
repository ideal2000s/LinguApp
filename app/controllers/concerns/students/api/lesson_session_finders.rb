# frozen_string_literal: true

module Students
  module API
    module LessonSessionFinders
      include LessonFinders

      private

      def lesson_session
        @lesson_session ||= LessonSession.find_session!(lesson: lesson, student: current_student)
      end
    end
  end
end
