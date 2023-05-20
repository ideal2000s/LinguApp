# frozen_string_literal: true

module Teams
  module Cases
    class CreateDefault < Micro::Case::Strict
      attributes :user

      def call!
        return Success() unless user

        team = user.owned_teams.first || create_team

        Success(team: team, user: user)
      end

      private

      def create_team
        team = Team.create(owner: user)
        TeamUser.create(team: team, user: user, default: true, role: :owner)
        team
      end
    end
  end
end
