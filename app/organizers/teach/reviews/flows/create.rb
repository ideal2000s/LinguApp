# frozen_string_literal: true

module Teach
  module Reviews
    module Flows
      class Create < Micro::Case::Safe
        flow Cases::Create,
             Cases::AwardCredits,
             Cases::UpdateLessonStatus,
             Cases::SendEmail
      end
    end
  end
end
