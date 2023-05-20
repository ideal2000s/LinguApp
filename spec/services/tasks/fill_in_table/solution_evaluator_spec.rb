# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::FillInTable::SolutionEvaluator, type: :service do
  let(:task) { build(:fill_in_table_task) }
  let(:task_session) { build(:task_session, task: task) }

  let(:options) do
    task_item.options.map.with_index do |option, index|
      {
        task_item_option_id: option.id,
        answer: answers[index]
      }
    end
  end

  shared_examples 'FillInTable solution evaluator' do |columns, answers, expected_result|
    subject(:result) { described_class.new(task_session).correct?(item_session) }

    let(:task_item) do
      options = columns.map do |answer|
        build(:fill_in_table_item_option, answer: answer)
      end

      build(:fill_in_table_item, question: 'some question', options: options)
    end
    let(:item_session) do
      build(:fill_in_table_item_session, task_session: task_session, task_item: task_item, answers: answers)
    end

    it { expect(result).to eq(expected_result) }
  end

  describe '#call' do
    context 'with incorrect answer' do
      it_behaves_like(
        'FillInTable solution evaluator',
        %w[expected_answer], %w[incorrect_answer],
        false
      )
    end

    context 'with some correct answers' do
      it_behaves_like(
        'FillInTable solution evaluator',
        %w[expected_answer], %w[incorrect_answer],
        false
      )
      it_behaves_like(
        'FillInTable solution evaluator',
        ['other_expected_answer:alternative'], %w[alternative],
        true
      )
      it_behaves_like(
        'FillInTable solution evaluator',
        %w[expected_answer], %w[incorrect_answer],
        false
      )
      it_behaves_like(
        'FillInTable solution evaluator',
        %w[expected_answer second_column_answer], %w[expected_answer wrong_second_answer],
        false
      )
    end

    context 'with all correct answers' do
      it_behaves_like(
        'FillInTable solution evaluator',
        %w[expected_answer], %w[expected_answer],
        true
      )
      it_behaves_like(
        'FillInTable solution evaluator',
        %w[expected_answer second_column_answer], %w[expected_answer second_column_answer],
        true
      )
    end

    context 'with special characters' do
      it_behaves_like(
        'FillInTable solution evaluator',
        %w[special/characters], %w[spe(cial)characters!],
        true
      )
    end
  end
end
