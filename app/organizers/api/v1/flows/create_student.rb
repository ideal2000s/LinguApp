# frozen_string_literal: true

module API
  module V1
    module Flows
      class CreateStudent < Micro::Case::Safe
        flow Cases::FindOrCreateStudent
      end
    end
  end
end
