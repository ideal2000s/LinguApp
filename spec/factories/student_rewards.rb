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
FactoryBot.define do
  factory :student_reward do
    student
    reward
  end
end
