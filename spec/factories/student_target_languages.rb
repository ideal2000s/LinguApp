# frozen_string_literal: true

# == Schema Information
#
# Table name: student_target_languages
#
#  id          :bigint           not null, primary key
#  student_id  :bigint
#  language_id :bigint
#  level       :integer          default("undefined"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :student_target_language do
    association :student
    association :language
    level { 'undefined' }
    active { true }
  end
end
