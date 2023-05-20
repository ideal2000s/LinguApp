# frozen_string_literal: true

module School
  module HubSpot
    module Cases
      class CreateAssociation < Base
        attributes :team, :user

        flow CreateCompany, CreateContact, self

        def call!
          return Success(team_user: team_user) if team_user.hubspot_associated

          associate
          Success(team_user: team_user)
        end

        private

        def team_user
          @team_user ||= user.team_users.find_by(team_id: team.id)
        end

        def associate
          api.create(
            team_user.user.hubspotid, 'Company',
            team_user.team.hubspotid, 'contact_to_company'
          )
          team_user.update(hubspot_associated: true)
        end

        def api
          super
          @api ||= Hubspot::Crm::Contacts::AssociationsApi.new
        end
      end
    end
  end
end
