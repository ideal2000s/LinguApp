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
class TeamFollower < ApplicationRecord
  belongs_to :team, counter_cache: :followers_count
  belongs_to :student, counter_cache: :team_followings_count
end
