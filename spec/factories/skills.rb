# frozen_string_literal: true

# == Schema Information
#
# Table name: skills
#
#  id                :bigint           not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  name_translations :jsonb            not null
#

FactoryBot.define do
  sequence :skill_name do |n|
    "Skill #{n}"
  end
  factory :skill do
    name { generate(:skill_name) }
  end
end
