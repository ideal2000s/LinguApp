# frozen_string_literal: true

module Students
  module API
    module Cases
      class UpdateTaskItemSessionCorrect < Micro::Case::Strict
        attributes :task_session, :answers

        def call!
          ActiveRecord::Base.transaction do
            task_session.task.solution_evaluator.new(task_session).call
          end

          Success(lesson_session: task_session.lesson_session)
        end
      end
    end
  end
end
