# frozen_string_literal: true

# == Schema Information
#
# Table name: student_option_solutions
#
#  id                       :bigint           not null, primary key
#  task_item_option_id      :bigint           not null
#  student_item_solution_id :bigint           not null
#  context                  :jsonb
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#

class StudentOptionSolution < ApplicationRecord
  belongs_to :task_item_option

  belongs_to :item,
             class_name: 'StudentItemSolution',
             foreign_key: :student_item_solution_id,
             inverse_of: :options

  store_accessor :context, :answer
  has_one_attached :audio
  has_one_attached :image

  delegate :correct, :split_answers, to: :task_item_option, prefix: true, allow_nil: true

  def correct?
    answer == task_item_option_correct
  end

  def correct_optional_answer?
    answer.in?(task_item_option_split_answers)
  end
end
