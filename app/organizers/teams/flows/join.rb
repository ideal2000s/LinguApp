# frozen_string_literal: true

module Teams
  module Flows
    class Join < Micro::Case::Safe
      flow Cases::Update,
           Cases::Join
    end
  end
end
