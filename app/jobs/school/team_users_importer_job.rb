# frozen_string_literal: true

module School
  class TeamUsersImporterJob < ::ApplicationJob
    include ::PublicActivityContextProvider

    def perform(current_user, current_team, user_params)
      public_activity_owner(current_user)
      TeamUserFactory.create_batch(current_team: current_team, users_params: user_params)
    end
  end
end
