# frozen_string_literal: true

module School
  module HubSpot
    module Cases
      class UpdateCompany < Base
        attributes :team, :property, :value

        def call!
          return Failure(team: team) if team.hubspotid.blank?
          return Failure(team: team) if property.blank?

          update
          Success(team: team)
        end

        private

        def update
          api.update(team.hubspotid, properties: properties)
        end

        def api
          super
          @api ||= Hubspot::Crm::Companies::BasicApi.new
        end

        def properties
          {
            property => value
          }
        end
      end
    end
  end
end
