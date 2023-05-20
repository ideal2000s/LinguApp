# frozen_string_literal: true

module Teach
  module Tasks
    module Flows
      class Update < Micro::Case
        flow Cases::ValidateOnUpdate,
             Cases::Update
      end
    end
  end
end
