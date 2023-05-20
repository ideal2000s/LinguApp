# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::Dictation::Form, type: :model do
  let!(:dictation_task) { build_stubbed(:dictation_task) }
  let(:valid_params) do
    {
      task: dictation_task,
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
