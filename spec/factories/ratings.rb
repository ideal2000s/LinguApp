# frozen_string_literal: true

# == Schema Information
#
# Table name: ratings
#
#  id         :bigint           not null, primary key
#  student_id :bigint           not null
#  lesson_id  :bigint           not null
#  rate       :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :rating do
    association :student
    association :lesson
    rate { '1' }
  end
end
