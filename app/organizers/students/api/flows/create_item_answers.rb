# frozen_string_literal: true

module Students::API
  module Flows
    class CreateItemAnswers < Micro::Case::Strict
      attributes :answers, :task_session

      flow Cases::CreateItemAnswers,
           Cases::UpdateTaskItemSessionCorrect,
           Cases::UpdateLessonSession
    end
  end
end
