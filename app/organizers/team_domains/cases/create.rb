# frozen_string_literal: true

module TeamDomains
  module Cases
    class Create < Micro::Case::Strict
      attributes :team, :domain

      def call!
        return Failure(team_domain) unless team_domain.persisted?

        create_invitations

        Success(TeamDomain.new)
      end

      private

      def team_domain
        @team_domain ||= team.team_domains.create(domain: domain)
      end

      def create_invitations
        return if invited_users.blank?

        team_invitations_params.each do |attr|
          TeamInvitation.create!(attr)
        end
      end

      def team_invitations_params
        invited_users.map do |user|
          { user_id: user.id, team_domain_id: team_domain.id, created_at: Time.current, updated_at: Time.current }
        end
      end

      def invited_users
        @invited_users ||= User.where('email ILIKE ?', "%@#{domain}%")
                               .left_joins(:team_users)
                               .where('(NOT(team_users.team_id = ?) OR team_users.team_id IS NULL)', team.id)
                               .distinct
                               .select(:id, :otp_secret)
      end
    end
  end
end
