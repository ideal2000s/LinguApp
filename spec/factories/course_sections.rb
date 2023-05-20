# frozen_string_literal: true

# == Schema Information
#
# Table name: course_sections
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string           default(""), not null
#  position   :integer          default(0), not null
#
FactoryBot.define do
  sequence(:name) { |n| "Name #{n}" }
  factory :course_section do
    name
    association :course
  end
end
