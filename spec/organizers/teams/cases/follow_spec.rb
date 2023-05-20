# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teams::Cases::Follow do
  subject(:result) { described_class.call(team: team, student: student) }

  let(:student) { create(:student) }
  let(:team) { create(:team) }

  context 'with success' do
    it { is_expected.to be_success }

    it do
      result

      expect(team.reload.followers_count).to eq(1)
    end

    it do
      result

      expect(student.reload.team_followings_count).to eq(1)
    end
  end

  context 'with follower not created' do
    let(:team_follower_double) { instance_double(TeamFollower, persisted?: false) }

    before do
      allow(TeamFollower).to receive(:create).and_return(team_follower_double)
    end

    it { is_expected.to be_failure }

    it do
      result

      expect(team.reload.followers_count).to eq(0)
    end

    it do
      result

      expect(student.reload.team_followings_count).to eq(0)
    end
  end
end
