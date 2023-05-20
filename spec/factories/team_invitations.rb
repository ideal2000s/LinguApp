# frozen_string_literal: true

# == Schema Information
#
# Table name: team_invitations
#
#  id             :bigint           not null, primary key
#  team_domain_id :bigint           not null
#  user_id        :bigint           not null
#  status         :integer          default("pending")
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
FactoryBot.define do
  factory :team_invitation do
    team_domain { nil }
    user { nil }
    status { 0 }
  end
end
