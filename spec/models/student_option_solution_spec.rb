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

require 'rails_helper'

RSpec.describe StudentOptionSolution, type: :model do
  describe '#correct?' do
    shared_examples 'StudentOptionSolution#correct?' do |answer, expected_answer, result|
      subject(:correct?) do
        build(
          :student_option_solution,
          answer: answer,
          task_item_option: build(:select_text_item_option, correct: expected_answer)
        ).correct?
      end

      it { is_expected.to eq(result) }
    end

    it_behaves_like 'StudentOptionSolution#correct?', true, true, true
    it_behaves_like 'StudentOptionSolution#correct?', true, false, false
    it_behaves_like 'StudentOptionSolution#correct?', false, true, false
    it_behaves_like 'StudentOptionSolution#correct?', false, false, true
  end
end
