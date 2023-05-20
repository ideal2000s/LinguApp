# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::InlineDropdown::SolutionEvaluator, type: :service do
  let(:task) { build(:inline_dropdown_task) }
  let(:task_session) { build(:task_session, task: task) }

  shared_examples 'InlineDropdown solution evaluator' do |statement, answers, expected_result|
    subject(:result) { described_class.new(task_session).correct?(item_session) }

    let(:task_item) do
      build(:inline_dropdown_item, statement: statement)
    end

    let(:item_session) do
      build(:inline_dropdown_item_session, task_session: task_session, task_item: task_item, answers: answers)
    end

    it { expect(result).to eq(expected_result) }
  end

  describe '#call' do
    context 'with incorrect answer' do
      it_behaves_like(
        'InlineDropdown solution evaluator',
        'John *select:speaks/talks/writes* English', %w[talks],
        false
      )
    end

    context 'with some correct answers' do
      it_behaves_like(
        'InlineDropdown solution evaluator',
        'Quick *select:brown/yellow/blue* Fox', %w[blue],
        false
      )
      it_behaves_like(
        'InlineDropdown solution evaluator',
        'A *select:quick/fast* fox', %w[quick],
        true
      )
      it_behaves_like(
        'InlineDropdown solution evaluator',
        '*select:Good/Bad* job!', %w[Bad],
        false
      )
      it_behaves_like(
        'InlineDropdown solution evaluator',
        'Lorem *select:ipsum/something/else* dolor *select:sit/what*', %w[ipsum what],
        false
      )
    end

    context 'with all correct answers' do
      it_behaves_like(
        'InlineDropdown solution evaluator',
        'John *select:speaks/talks/writes* English', %w[speaks],
        true
      )
      it_behaves_like(
        'InlineDropdown solution evaluator',
        'A *select:quick/fast* *select:brown/yellow* fox ', %w[quick brown],
        true
      )
    end
  end
end
