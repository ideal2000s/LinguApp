# frozen_string_literal: true

module Students
  module API
    module Cases
      class CalculateLessonDuration < Micro::Case::Strict
        attributes :lesson_session

        def call!
          if lesson_session.completed?
            lesson_session.update!(duration: lesson_session_duration)
            lesson.update!(average_duration: average_lesson_duration)
          end

          Success(task_session: lesson_session.current_task_session, lesson_session: lesson_session)
        end

        private

        def lesson_session_duration
          lesson_session.task_sessions.completed.sum(:duration)
        end

        def average_lesson_duration
          lesson.sessions.completed.recent.average(:duration)
        end

        def lesson
          lesson_session.lesson
        end
      end
    end
  end
end
