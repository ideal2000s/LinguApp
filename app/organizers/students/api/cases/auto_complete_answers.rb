# frozen_string_literal: true

module Students
  module API
    module Cases
      class AutoCompleteAnswers < Micro::Case::Strict
        attributes :task_session

        def call!
          complete_items
          task_session.completed!

          Success(task_session: task_session, lesson_session: task_session.lesson_session)
        end

        private

        def complete_items
          task_session.task_item_sessions.each do |item|
            item.update!(completed: true)
          end
        end
      end
    end
  end
end
