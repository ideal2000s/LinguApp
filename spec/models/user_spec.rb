# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  fname                  :string
#  lname                  :string
#  email                  :string
#  mobile                 :string
#  locale                 :string
#  role                   :integer          default("basic"), not null
#  status                 :integer          default("active"), not null
#  meta                   :jsonb            not null
#  discarded_at           :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  credits                :integer          default(0)
#  avatar_data            :text
#  lessons_count          :integer          default(0), not null
#  otp_secret             :string
#  last_otp_at            :datetime
#  failed_attempts        :integer          default(0), not null
#  unlock_token           :string
#  locked_at              :datetime
#  default_team_user_id   :integer
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  time_zone              :string
#  hubspotid              :string
#

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'Model relations' do
    it { is_expected.to validate_presence_of(:fname) }
    it { is_expected.to validate_presence_of(:lname) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it { is_expected.to have_many(:comments) }

    # TODO: does not work with 0 and 3
    # it { is_expected.to define_enum_for(:role).with_values(described_class.roles.keys) }
  end

  describe '#default_team' do
    let(:user) { create(:user) }
    let(:team) { create(:team, owner: user) }

    before { team }

    it 'has a default_team_user_id assigned' do
      expect(user.default_team_user_id).to eq(team.team_user_ids.first)
    end

    it 'returns default team' do
      expect(user.default_team).to eq(team)
    end
  end
end
