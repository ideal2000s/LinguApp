# frozen_string_literal: true

module Teams
  module Cases
    class Join < Micro::Case::Strict
      attributes :team, :user, :params

      def call!
        team_user = TeamUser.create(user: user, team: team, default: params[:default])

        if team_user.persisted?
          Success(team: team, user: user)
        else
          Failure(:error) { { team: team } }
        end
      end
    end
  end
end
