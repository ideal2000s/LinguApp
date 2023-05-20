# frozen_string_literal: true

module Students
  module API
    module Cases
      class CreateItemAnswers < Micro::Case::Strict
        attributes :task_session, :answers

        def call!
          ActiveRecord::Base.transaction do
            task_session.update(task_item_sessions_attributes: answers)
          end

          Success(lesson_session: task_session.lesson_session)
        end
      end
    end
  end
end
