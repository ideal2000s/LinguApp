# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teams::Cases::Leave do
  subject(:result) { described_class.call(team: team, user: user) }

  let(:user) { create(:user) }
  let(:team) { create(:team) }
  let(:another_team) { create(:team) }
  let(:team_user) { create(:team_user, team: team, user: user) }
  let(:another_team_user) { create(:team_user, team: another_team, user: user) }
  let(:default) { true }

  context 'with success' do
    before do
      team
      team_user
      another_team_user
    end

    it { is_expected.to be_success }

    it 'discards a TeamUser record' do
      expect { result }.to change(TeamUser.discarded, :count).by(1)
    end

    it 'does not create an new Team' do
      expect { result }.not_to change(Team, :count)
    end
  end

  context 'with failure' do
    let(:team_user_double) { instance_double(TeamUser, discard: false) }

    before do
      allow(TeamUser).to receive(:create).and_return(team_user_double)
      team
    end

    it { is_expected.to be_failure }

    it 'does not discard a TeamUser record' do
      expect { result }.not_to change(TeamUser.discarded, :count)
    end
  end
end
