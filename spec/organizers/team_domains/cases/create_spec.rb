# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TeamDomains::Cases::Create do
  subject(:result) { described_class.call(team: team, domain: domain) }

  let(:team) { create(:team) }
  let(:domain) { 'example.com' }
  let(:user) { create(:user, :with_admin_role, email: 'some_email@example.com') }

  context 'with invalid team domain' do
    let(:persisted_stub) { instance_double(TeamDomain, persisted?: false) }
    let(:team_domains_stub) { class_double(TeamDomain, create: persisted_stub) }

    before do
      allow(team).to receive(:team_domains).and_return(team_domains_stub)
    end

    it { is_expected.to be_failure }
  end

  context 'with valid team domain' do
    it { is_expected.to be_success }

    it do
      user
      result
      team_domain = team.reload.team_domains.first
      invitation = team_domain.team_invitations.first

      expect(invitation.user).to eq(user)
    end
  end
end
