# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::TrueFalse::SolutionEvaluator, type: :service do
  shared_examples 'TrueFalse solution evaluator' do |veracity, answer, expected_result|
    subject(:result) { described_class.new(task_session).correct?(item_session) }

    let(:task_item) { build(:true_false_item, veracity: veracity) }
    let(:task) { build(:true_false_task) }
    let(:task_session) { build(:task_session, task: task) }
    let(:item_session) { build(:task_item_session, task_session: task_session, task_item: task_item, answer: answer) }

    it { expect(result).to eq(expected_result) }
  end

  describe '#call' do
    context 'with incorrect answer' do
      it_behaves_like 'TrueFalse solution evaluator', true, false, false
    end

    context 'with correct answer' do
      it_behaves_like 'TrueFalse solution evaluator', true, true, true
    end
  end
end
