# frozen_string_literal: true

module Teams
  module Cases
    class Update < Micro::Case::Strict
      attributes :team, :user, :params, :user_params

      def call!
        if user.update(user_params)
          Success(team: team, user: user, params: params)
        else
          Failure(:error) { { user: user } }
        end
      end
    end
  end
end
