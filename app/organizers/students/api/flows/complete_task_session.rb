# frozen_string_literal: true

module Students::API
  module Flows
    class CompleteTaskSession < Micro::Case::Safe
      flow Cases::AutoCompleteAnswers,
           Cases::UpdateLessonSession,
           Cases::CalculateSessionDuration
    end
  end
end
