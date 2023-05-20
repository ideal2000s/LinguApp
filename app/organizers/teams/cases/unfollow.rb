# frozen_string_literal: true

module Teams
  module Cases
    class Unfollow < Micro::Case::Safe
      attributes :team, :student

      def call!
        return Failure('Already unfollowed') if follower.blank?
        return Success() if follower.destroy

        Failure()
      end

      private

      def follower
        @follower ||= TeamFollower.find_by(student: student, team: team)
      end
    end
  end
end
