# frozen_string_literal: true

# == Schema Information
#
# Table name: licenses
#
#  id              :bigint           not null, primary key
#  team_student_id :bigint           not null
#  plan_id         :bigint           not null
#  expires_at      :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :license do
    association :team_student
    association :plan
  end
end
