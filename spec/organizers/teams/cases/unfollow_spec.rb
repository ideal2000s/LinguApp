# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teams::Cases::Unfollow do
  subject(:result) { described_class.call(team: team, student: student) }

  let(:student) { create(:student) }
  let(:team) { create(:team) }
  let(:team_follower) { create(:team_follower, student: student, team: team) }

  context 'with success' do
    before { team_follower }

    it { is_expected.to be_success }

    it do
      result

      expect(team.reload.followers_count).to eq(0)
    end

    it do
      result

      expect(student.reload.team_followings_count).to eq(0)
    end
  end

  context 'with follower not destroyed' do
    let(:team_follower_double) { instance_double(TeamFollower, destroy: false) }

    before do
      team_follower
      allow(TeamFollower).to receive(:find_by).and_return(team_follower_double)
    end

    it { is_expected.to be_failure }

    it do
      result

      expect(team.reload.followers_count).to eq(1)
    end

    it do
      result

      expect(student.reload.team_followings_count).to eq(1)
    end
  end

  context 'with follower not found' do
    before do
      allow(TeamFollower).to receive(:find_by).and_return(nil)
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
