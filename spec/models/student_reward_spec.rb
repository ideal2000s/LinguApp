# frozen_string_literal: true

# == Schema Information
#
# Table name: student_rewards
#
#  id         :bigint           not null, primary key
#  student_id :bigint
#  reward_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe StudentReward, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:student) }
    it { is_expected.to belong_to(:reward) }
  end
end
