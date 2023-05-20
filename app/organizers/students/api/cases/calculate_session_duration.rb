# frozen_string_literal: true

module Students
  module API
    module Cases
      class CalculateSessionDuration < Micro::Case::Strict
        attributes :task_session

        def call!
          task_session.update!(duration: duration)
          task_session.lesson_session.update!(duration: lesson_session_duration)

          Success(task_session: task_session)
        end

        private

        def duration
          Heartbeat::Analyze.call(uid: task_session.id) || 0
        end

        def lesson_session_duration
          task_session.lesson_session.task_sessions.sum(:duration)
        end
      end
    end
  end
end
