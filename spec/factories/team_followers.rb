# frozen_string_literal: true

# == Schema Information
#
# Table name: team_followers
#
#  id         :bigint           not null, primary key
#  team_id    :bigint           not null
#  student_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :team_follower do
    team { nil }
    student { nil }
  end
end
