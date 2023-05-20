# frozen_string_literal: true

module School
  module Students
    module Flows
      class Create < Micro::Case
        flow Cases::CreateOrUpdate,
             Cases::CreateLicense
      end
    end
  end
end
