# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::ArrangeWords::Form, type: :model do
  let!(:arrange_words) { build_stubbed(:arrange_words_task) }
  let(:valid_params) do
    {
      task: arrange_words,
      name: 'name',
      introduction: 'Introduction'
    }
  end
  let(:invalid_params) { valid_params.merge(name: nil) }

  describe '#persist!' do
    context 'when Essay form valid' do
      subject(:task_form) { described_class.new(valid_params) }

      it { expect(task_form.valid?).to eq(true) }
    end

    context 'when Essay form invalid' do
      subject(:task_form) { described_class.new(invalid_params) }

      it { expect(task_form.valid?).to eq(false) }
    end
  end

  describe 'Model validations' do
    subject { described_class.new(valid_params) }

    it { is_expected.to be_valid }
  end
end
