# frozen_string_literal: true

module School
  module HubSpot
    module Cases
      class CreateCompany < Base
        attributes :team

        def call!
          return Success(team: team) if team.hubspotid.present?

          create
          Success(team: team)
        end

        private

        def create
          result = api.create(properties: properties)
          team.update(hubspotid: result.id)
        end

        def api
          super
          @api ||= Hubspot::Crm::Companies::BasicApi.new
        end

        def properties
          {
            name: team.name
          }
        end
      end
    end
  end
end
