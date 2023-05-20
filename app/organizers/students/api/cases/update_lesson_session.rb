# frozen_string_literal: true

module Students
  module API
    module Cases
      class UpdateLessonSession < Micro::Case::Strict
        attributes :lesson_session

        def call!
          lesson_session.update(progress: progress)

          Success(lesson_session: lesson_session)
        end

        private

        def progress
          tasks.each_with_object({}) do |task, memo|
            memo[task.id] = task_progress(task)
          end
        end

        def tasks
          lesson_session.lesson.published_tasks
        end

        def task_sessions
          lesson_session.task_sessions.includes(:task).load
        end

        def task_progress(task)
          return if task.items.empty?

          progress_task_session = task_sessions.find_by(task_id: task.id)
          return if progress_task_session.blank? # this is unlikely situation

          progress_task_session.task_item_sessions.pluck(:completed).map { |e| e ? 1 : 0 }
        end
      end
    end
  end
end
