# frozen_string_literal: true

# == Schema Information
#
# Table name: team_users
#
#  id                 :bigint           not null, primary key
#  team_id            :bigint
#  user_id            :bigint
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  legacy_default     :boolean          default(FALSE)
#  role               :integer          default("member"), not null
#  discarded_at       :datetime
#  hubspot_associated :boolean          default(FALSE)
#
require 'rails_helper'

RSpec.describe TeamUser, type: :model do
  let(:user) { create(:user) }
  let(:owned_team) { create(:team) }
  let(:another_team) { create(:team) }

  describe 'Associations' do
    it { is_expected.to belong_to(:team) }
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_one(:defaulted_to_user) }
  end

  describe 'managed teams' do
    let(:owned_team_user) { create(:team_user, team: owned_team, user: user, role: :owner) }
    let(:team_user) { create(:team_user, team: another_team, user: user, role: :member) }

    specify 'returns owned team' do
      team_user
      owned_team_user

      expect(user.managed_teams.to_a).to eq([owned_team])
    end
  end

  describe 'default team' do
    let(:owned_team_user) { create(:team_user, team: owned_team, user: user, role: :owner, default: true) }
    let(:another_team_user) { create(:team_user, team: another_team, user: user, role: :owner) }

    context 'when assigns default team' do
      before do
        user.default_team_user = owned_team_user
      end

      it 'assigns correct team' do
        expect(user.default_team).to eq(owned_team)
      end

      it 'team_user assigned becomes default' do
        expect(owned_team_user).to be_default
      end

      it 'returns correct team' do
        expect(user.default_team).not_to eq(another_team)
      end
    end

    context 'when re-assigns default team' do
      before do
        user.default_team_user = owned_team_user
        user.default_team_user = another_team_user
      end

      it 're-assigns correct team' do
        expect(user.default_team).to eq(another_team)
      end

      it 'team_user re-assigned becomes default' do
        expect(another_team_user).to be_default
      end

      it 'returns correct team' do
        expect(user.default_team).not_to eq(owned_team)
      end
    end
  end
end
