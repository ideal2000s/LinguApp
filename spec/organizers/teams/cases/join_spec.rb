# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teams::Cases::Join do
  subject(:result) { described_class.call(team: team, user: user, params: params) }

  let(:user) { create(:user) }
  let(:team) { create(:team) }
  let(:default) { true }
  let(:params) do
    { default: default }
  end

  context 'with success' do
    before do
      team
    end

    it { is_expected.to be_success }

    it 'creates a new TeamUser record' do
      expect { result }.to change(TeamUser, :count).by(1)
    end

    it 'does not create an new Team' do
      expect { result }.not_to change(Team, :count)
    end
  end

  context 'with failure' do
    let(:team_user_double) { instance_double(TeamUser, persisted?: false) }

    before do
      allow(TeamUser).to receive(:create).and_return(team_user_double)
      team
    end

    it { is_expected.to be_failure }

    it do
      expect { result }.not_to change(TeamUser, :count)
    end
  end
end
