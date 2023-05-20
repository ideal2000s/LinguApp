# frozen_string_literal: true

module Teams
  module Cases
    class Follow < Micro::Case::Safe
      attributes :team, :student

      def call!
        return Success() if follower.persisted?

        Failure()
      end

      private

      def follower
        @follower ||= TeamFollower.create(student: student, team: team)
      end
    end
  end
end
