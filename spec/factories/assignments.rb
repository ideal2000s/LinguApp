# frozen_string_literal: true

# == Schema Information
#
# Table name: assignments
#
#  id          :bigint           not null, primary key
#  team_id     :bigint           not null
#  language_id :bigint           not null
#  name        :string           default(""), not null
#  context     :integer          default("text"), not null
#  instruction :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :assignment do
    association :team
    association :language

    name { 'school assignment' }
    instruction { 'school assignment instruction' }
  end
end
