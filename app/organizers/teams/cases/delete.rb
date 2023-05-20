# frozen_string_literal: true

module Teams
  module Cases
    class Delete < Micro::Case::Strict
      attributes :team, :user

      def call!
        if team.discard
          Success(team: team, user: user)
        else
          Failure(:error)
        end
      end
    end
  end
end
