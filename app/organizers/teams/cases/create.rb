# frozen_string_literal: true

module Teams
  module Cases
    class Create < Micro::Case::Strict
      attributes :user, :params

      DEFAULT_DATE_DESTROY_USER_DATA = 365

      def call!
        team = create_team

        if team.persisted?
          Success(team: team, user: user)
        else
          Failure(:error) { { team: team } }
        end
      end

      private

      def create_team
        Team.create(team_params)
      end

      def team_params
        params.merge(
          status: :school,
          owner: user,
          destroy_user_data_after: DEFAULT_DATE_DESTROY_USER_DATA,
          team_users_attributes: [{
            user: user,
            role: :owner
          }]
        )
      end
    end
  end
end
