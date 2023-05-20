# frozen_string_literal: true

module Auth
  module Cases
    class CreateTeamInvitations < Micro::Case::Safe
      attributes :user

      def call!
        return Success(user: user) if team_domains.blank?

        team_invitations_attributes.each do |attr|
          TeamInvitation.create!(attr)
        end

        Success(user: user)
      end

      private

      def team_domains
        TeamDomain.where(domain: domain).select(:id)
      end

      def domain
        @domain ||= user.email.split('@').last
      end

      def team_invitations_attributes
        team_domains.map do |team_domain|
          { user_id: user.id, team_domain_id: team_domain.id, created_at: Time.current, updated_at: Time.current }
        end
      end
    end
  end
end
