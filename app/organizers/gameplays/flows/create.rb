# frozen_string_literal: true

module Gameplays
  module Flows
    class Create < Micro::Case::Safe
      flow Cases::Create,
           ::Wordplays::Cases::BulkCreate
    end
  end
end
