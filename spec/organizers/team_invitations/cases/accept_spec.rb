# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TeamInvitations::Cases::Accept do
  subject(:result) { described_class.call(user: user, team_invitation: team_invitation) }

  let(:user) { build :user }
  let(:team_invitation) { instance_double(TeamInvitation, team: nil) }

  before { allow(team_invitation).to receive(:accepted!) }

  describe '#call' do
    it { is_expected.to be_success }

    it do
      result

      expect(team_invitation).to have_received(:accepted!)
    end
  end
end
