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
FactoryBot.define do
  factory :team_user do
    team
    user
  end
end
