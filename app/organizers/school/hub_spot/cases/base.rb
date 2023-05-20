# frozen_string_literal: true

module School
  module HubSpot
    module Cases
      class Base < Micro::Case::Safe
        protected

        # This works well with tests and makes possible to override ENV variable
        def api
          Hubspot.configure do |config|
            config.api_key['hapikey'] = ENV.fetch('HUBSPOT_API_KEY')
          end
        end
      end
    end
  end
end
