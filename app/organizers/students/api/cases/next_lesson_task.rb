# frozen_string_literal: true

module Students
  module API
    module Cases
      class NextLessonTask < Micro::Case::Strict
        attributes :lesson_session

        def call!
          lesson_session.update!(current_task_session: next_task_session)

          Success(task_session: current_task_session, lesson_session: lesson_session)
        end

        private

        def next_task_session
          return find_or_create_task_session(next_task) if empty_task_session?
          return current_task_session unless current_task_session_completed?

          find_or_create_task_session(next_task)
        rescue ActiveRecord::RecordNotFound => e
          lesson_session.update!(current_task_session: nil, status: :completed)
          lesson.update(average_duration: average_lesson_duration)
          lesson_session.create_activity(:complete, recipient: lesson_session.student)
          raise e
        end

        def average_lesson_duration
          lesson.sessions.completed.recent.average(:duration)
        end

        def empty_task_session?
          lesson_session.current_task_session_id.blank?
        end

        def current_task_session_completed?
          current_task_session.completed?
        end

        def current_task_session
          lesson_session.current_task_session
        end

        def find_or_create_task_session(task)
          result = Cases::CreateTaskSession.call(lesson_session: lesson_session, task: task)
          result.value[:task_session]
        end

        def first_task
          raise 'Lesson has no tasks' if lesson_tasks.empty?

          lesson_tasks.first
        end

        def next_task
          @next_task ||= lesson_tasks.where.not(id: completed_tasks_query).take!
        end

        def lesson_tasks
          lesson.published_tasks
        end

        def completed_tasks_query
          lesson_session.task_sessions.completed.select(:task_id)
        end

        def lesson
          lesson_session.lesson
        end
      end
    end
  end
end
