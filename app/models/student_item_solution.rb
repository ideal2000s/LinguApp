# frozen_string_literal: true

# == Schema Information
#
# Table name: student_item_solutions
#
#  id                  :bigint           not null, primary key
#  task_item_id        :bigint           not null
#  student_solution_id :bigint           not null
#  context             :jsonb
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class StudentItemSolution < ApplicationRecord
  ANSWERS_INDEX_KEY = 'index'
  ANSWERS_VALUE_KEY = 'answer'

  belongs_to :task_item
  belongs_to :student_solution,
             class_name: 'StudentSolution',
             inverse_of: :items

  has_many :options,
           class_name: 'StudentOptionSolution',
           dependent: :destroy,
           inverse_of: :item

  has_one_attached :audio
  has_one_attached :image

  store_accessor :context, :answers, :answer

  delegate :veracity, :arrange_words, :answers, :correct_answers, :prepared_statement, :word_body,
           to: :task_item, prefix: true, allow_nil: true

  def sorted_answers
    answers
      .to_a
      .sort_by { |answer| answer[ANSWERS_INDEX_KEY] }
      .pluck(ANSWERS_VALUE_KEY)
  end
end
