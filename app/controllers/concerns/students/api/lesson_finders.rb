# frozen_string_literal: true

module Students
  module API
    module LessonFinders
      def lesson
        @lesson ||= lesson_scope.find(params[:lesson_id])
      end

      def lesson_scope
        Lesson.kept.published
      end
    end
  end
end
