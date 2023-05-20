# frozen_string_literal: true

# == Schema Information
#
# Table name: student_assignments
#
#  id            :bigint           not null, primary key
#  assignment_id :bigint           not null
#  student_id    :bigint           not null
#  passed_at     :datetime
#  deadline      :datetime
#  status        :integer          default("pending"), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
FactoryBot.define do
  factory :student_assignment do
    association :assignment
    association :student
  end
end
