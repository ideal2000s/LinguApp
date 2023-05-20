# frozen_string_literal: true

module Teams
  module Cases
    class Leave < Micro::Case::Strict
      attributes :team, :user

      def call!
        team_user = user.team_users.find_by(team_id: team.id)
        user.update(default_team_user: user.team_users.exclude(team_user).first) if team_user&.default?

        if team_user&.discard
          Success(team: team, user: user)
        else
          Failure(:error)
        end
      end
    end
  end
end
