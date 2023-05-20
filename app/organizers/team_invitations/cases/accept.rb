# frozen_string_literal: true

module TeamInvitations
  module Cases
    class Accept < Micro::Case::Strict
      attributes :user, :team_invitation

      def call!
        team_invitation.accepted!

        Success(team: team_invitation.team, params: { default: false })
      end
    end
  end
end
