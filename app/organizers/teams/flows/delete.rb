# frozen_string_literal: true

module Teams
  module Flows
    class Delete < Micro::Case::Safe
      flow Cases::Leave,
           Cases::Delete
    end
  end
end
