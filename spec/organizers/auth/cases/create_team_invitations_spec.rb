# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Auth::Cases::CreateTeamInvitations do
  subject(:result) { described_class.call(user: user) }

  let(:user) { create(:user, :with_admin_role, email: 'some_email@example.com') }

  context 'without matching team domains' do
    it { is_expected.to be_success }
  end

  context 'with matching team domains' do
    let(:team) { create(:team) }
    let(:team_domain) { create(:team_domain, domain: 'example.com', team: team) }

    it { is_expected.to be_success }

    it do
      team_domain
      result
      user.reload
      first_invitation = user.team_invitations.first

      expect(first_invitation.team_domain).to eq(team_domain)
    end
  end
end
