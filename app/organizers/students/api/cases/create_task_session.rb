# frozen_string_literal: true

module Students
  module API
    module Cases
      class CreateTaskSession < Micro::Case::Strict
        attributes :lesson_session, :task
        attr_accessor :task_session

        def call!
          TaskSession.transaction do
            find_or_create_task_session!
            lesson_session.update!(current_task_session: task_session)
          end

          Success(task_session: task_session)
        end

        private

        def find_or_create_task_session!
          @task_session = task
                          .task_sessions
                          .create_with(status: :active)
                          .find_or_create_by!(lesson_session: lesson_session)

          precreate_task_item_sessions if @task_session.id_previously_changed?
        end

        def precreate_task_item_sessions
          task_session.task.items.each do |item|
            task_session.task_item_sessions.precreate_from_item!(item)
          end
        end

        def empty_task_session?
          lesson_session.current_task_session_id.blank?
        end
      end
    end
  end
end
