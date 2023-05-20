# frozen_string_literal: true

module Teach
  module Reviews
    module Flows
      class Delete < Micro::Case::Safe
        flow Cases::Delete,
             Cases::ReturnCredits,
             Cases::UpdateLessonStatus
      end
    end
  end
end
