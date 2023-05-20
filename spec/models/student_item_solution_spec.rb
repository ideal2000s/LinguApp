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

require 'rails_helper'

RSpec.describe StudentItemSolution, type: :model do
  subject(:item) { described_class.new(answers: answers) }

  describe '#sorted_answers' do
    subject(:sorted_answers) { item.sorted_answers }

    context 'with array' do
      let(:answers) do
        [
          {
            described_class::ANSWERS_INDEX_KEY => 2,
            described_class::ANSWERS_VALUE_KEY => 'Second value'
          },
          {
            described_class::ANSWERS_INDEX_KEY => 0,
            described_class::ANSWERS_VALUE_KEY => 'First value'
          }
        ]
      end

      it { is_expected.to eq(['First value', 'Second value']) }
    end

    context 'with nil' do
      let(:answers) { nil }

      it { is_expected.to eq([]) }
    end
  end
end
