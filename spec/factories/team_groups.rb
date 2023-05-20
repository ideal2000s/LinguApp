# frozen_string_literal: true

# == Schema Information
#
# Table name: team_groups
#
#  id                  :bigint           not null, primary key
#  team_id             :bigint
#  language_id         :bigint
#  name                :string           not null
#  level               :integer          not null
#  discarded_at        :datetime
#  archived_at         :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  team_students_count :integer          default(0), not null
#  joinable            :boolean          default(TRUE), not null
#  course_id           :integer
#
FactoryBot.define do
  factory :team_group do
    team
    association :language
    name { Faker::Name.first_name }
    level { 'undefined' }
  end
end
