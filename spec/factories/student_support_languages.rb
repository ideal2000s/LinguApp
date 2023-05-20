# frozen_string_literal: true

# == Schema Information
#
# Table name: student_support_languages
#
#  id          :bigint           not null, primary key
#  student_id  :bigint           not null
#  language_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :student_support_language do
    association :student
    association :language
    native { false }
  end
end
