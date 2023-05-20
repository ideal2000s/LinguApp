# frozen_string_literal: true

# == Schema Information
#
# Table name: team_students
#
#  id                :bigint           not null, primary key
#  team_id           :bigint           not null
#  student_id        :bigint           not null
#  archived_at       :datetime
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  discarded_at      :datetime
#  team_group_id     :bigint
#  active_license_id :integer
#  course_id         :integer
#
FactoryBot.define do
  factory :team_student do
    association :team
    association :student
  end
end
