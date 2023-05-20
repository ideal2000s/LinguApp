# frozen_string_literal: true

module School
  class AddTeamGroupPlanJob < ::ApplicationJob
    include ::PublicActivityContextProvider

    def perform(current_user, team_group_id, plan_id)
      public_activity_owner(current_user)
      team_group = TeamGroup.find(team_group_id)
      plan = Plan.find(plan_id)
      AddPlanTeamGroupService.assign_license_to_members(team_group: team_group, plan_id: plan.id)
    end
  end
end
