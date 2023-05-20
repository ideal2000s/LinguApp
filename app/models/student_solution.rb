# frozen_string_literal: true

# == Schema Information
#
# Table name: student_solutions
#
#  id            :bigint           not null, primary key
#  solution      :jsonb            not null
#  task_snapshot :jsonb            not null
#  correct       :boolean          default(FALSE)
#  score         :integer
#  discarded_at  :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class StudentSolution < ApplicationRecord
  has_many_attached :attachments
  has_many :items,
           class_name: 'StudentItemSolution',
           dependent: :destroy,
           inverse_of: :student_solution
end
