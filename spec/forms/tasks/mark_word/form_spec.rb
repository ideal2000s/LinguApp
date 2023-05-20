# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::MarkWord::Form, type: :model do
  let(:task) { build_stubbed(:mark_word_task) }
  let(:valid_params) do
    {
      task: task,
      name: 'Statements for you',
      introduction: 'Introduction'
    }
  end
  let(:invalid_params) { valid_params.merge(name: nil) }

  describe '#persist!' do
    context 'when MarkWordTask form valid' do
      subject(:task_form) { described_class.new(valid_params) }

      it { is_expected.to be_valid }
    end

    context 'when MarkWordTask form invalid' do
      subject(:task_form) { described_class.new(invalid_params) }

      it { is_expected.not_to be_valid }
    end
  end

  describe 'Model validations' do
    subject { described_class.new(task: Tasks::MarkWord.new) }

    it { is_expected.to validate_presence_of(:name) }
  end
end
