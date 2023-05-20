# frozen_string_literal: true

module Students
  module API
    module TaskFinders
      include LessonFinders

      private

      def task_scope
        lesson.published_tasks
      end

      def task
        @task ||= task_scope.find(params[:task_id])
      end
    end
  end
end
