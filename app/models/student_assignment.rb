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
class StudentAssignment < ApplicationRecord
  belongs_to :assignment
  belongs_to :student
  has_one :document, as: :assignable, dependent: :destroy

  enum status: { pending: 0, answered: 1, skipped: 2, reviewed: 3 }

  scope :by_student, ->(student_id) { where(student_id: student_id) }
end
