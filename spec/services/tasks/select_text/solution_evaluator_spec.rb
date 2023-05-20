# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::SelectText::SolutionEvaluator, type: :service do
  subject(:result) { described_class.new(task_session).correct?(item_session) }

  let(:task) { build(:select_text_task) }
  let(:task_session) { build(:task_session, task: task) }
  let(:item_session) do
    build(:select_text_item_session, task_session: task_session, task_item: task_item, answer: { options: options })
  end
  let(:options) do
    task_item.options.map.with_index do |option, index|
      {
        task_item_option_id: option.id,
        answer: answers[index]
      }
    end
  end

  context 'with single choice' do
    let(:task_item) do
      build(
        :select_text_item,
        single_choice: true,
        options: [
          build_stubbed(:select_text_item_option, answer: 'Correct answer', correct: true),
          build_stubbed(:select_text_item_option, answer: 'Wrong answer', correct: false)
        ]
      )
    end

    context 'with correct answer' do
      let(:answers) { [true, false] }

      it { expect(result).to be(true) }
    end

    context 'with incorrect answer' do
      let(:answers) { [false, true] }

      it { expect(result).to be(false) }
    end
  end

  context 'with multiple choice' do
    let(:task_item) do
      build(
        :select_text_item,
        single_choice: false,
        options: [
          build_stubbed(:select_text_item_option, answer: 'Correct answer', correct: true),
          build_stubbed(:select_text_item_option, answer: 'Also correct answer', correct: true),
          build_stubbed(:select_text_item_option, answer: 'Wrong answer', correct: false)
        ]
      )
    end

    context 'with correct answer' do
      let(:answers) { [true, true, nil] }

      it { expect(result).to be(true) }
    end

    context 'with incorrect answer' do
      let(:answers) { [nil, true, nil] }

      it { expect(result).to be(false) }
    end
  end
end
