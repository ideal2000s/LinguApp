# frozen_string_literal: true

module School
  class AddTeamUserHubspotJob < ::ApplicationJob
    def perform(team_user_id)
      return unless enabled?

      team_user = TeamUser.find(team_user_id)
      School::HubSpot::Cases::CreateAssociation.call(team: team_user.team, user: team_user.user)
    end

    private

    def enabled?
      ENV['HUBSPOT_API_KEY'].present?
    end
  end
end
