# frozen_string_literal: true

module Teach
  module Tasks
    module Flows
      class Create < Micro::Case::Safe
        flow Cases::ValidateOnCreate,
             Cases::Create
      end
    end
  end
end
