# frozen_string_literal: true

module Teams
  module Cases
    class SetDefault < Micro::Case::Strict
      attributes :team, :user

      def call!
        team_user = user.team_users.find_by(team_id: team.id)
        user.update(default_team_user: team_user)

        Success(team_user: team_user)
      end
    end
  end
end
