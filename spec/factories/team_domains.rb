# frozen_string_literal: true

# == Schema Information
#
# Table name: team_domains
#
#  id         :bigint           not null, primary key
#  team_id    :bigint           not null
#  domain     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :team_domain do
    team { nil }
    sequence(:domain) { |n| "example#{n}.com" }
  end
end
