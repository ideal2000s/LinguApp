# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::FillInBlanks::SolutionEvaluator, type: :service do
  let(:task) { build(:fill_in_blanks_task) }
  let(:task_session) { build(:task_session, task: task) }

  shared_examples 'FillInBlanks solution evaluator' do |question, answers, expected_result|
    subject(:result) { described_class.new(task_session).correct?(item_session) }

    let(:task_item) { build(:fill_in_blanks_item, question: question) }
    let(:item_session) do
      build(:fill_in_blanks_item_session, task_session: task_session, task_item: task_item, answers: answers)
    end

    it { expect(result).to eq(expected_result) }
  end

  describe '#call' do
    context 'with incorrect answer' do
      it_behaves_like(
        'FillInBlanks solution evaluator',
        'John *speaks:talks:writes* English', %w[eats],
        false
      )
    end

    context 'with some correct answers' do
      it_behaves_like(
        'FillInBlanks solution evaluator',
        'A *quick* fox', %w[quick],
        true
      )
      it_behaves_like(
        'FillInBlanks solution evaluator',
        'Quick *brown* Fox', %w[blue],
        false
      )
      it_behaves_like(
        'FillInBlanks solution evaluator',
        '*Good:Great* job!', %w[Bad],
        false
      )
      it_behaves_like(
        'FillInBlanks solution evaluator',
        'Lorem *something:ipsum* dolor *what:sit* *amet:amen*', %w[ipsum sit no],
        false
      )
    end

    context 'with all correct answers' do
      it_behaves_like(
        'FillInBlanks solution evaluator',
        'John *speaks:talks:writes* English', %w[speaks],
        true
      )
      it_behaves_like(
        'FillInBlanks solution evaluator',
        'John *speaks:talks:writes* English', %w[talks],
        true
      )
      it_behaves_like(
        'FillInBlanks solution evaluator',
        'A *quick:fast* *yellow:brown* fox ', %w[quick brown],
        true
      )
    end

    context 'with special characters' do
      it_behaves_like(
        'FillInBlanks solution evaluator',
        'John *special/characters* English', %w[spe(cial)characters!],
        true
      )
    end
  end
end
