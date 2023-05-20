# frozen_string_literal: true

module Students
  module API
    module TaskItemSessionFinders
      private

      def task_item_session
        task_session.task_item_sessions.find(params[:id])
      end

      def task_session
        @task_session ||= current_student.task_sessions.find(params[:task_session_id])
      end
    end
  end
end
