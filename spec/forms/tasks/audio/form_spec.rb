# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::Audio::Form, type: :model do
  let!(:audio) { build_stubbed(:audio_task) }
  let(:valid_params) do
    {
      task: audio,
      name: 'name',
      introduction: 'Introduction'
    }
  end
  let(:invalid_params) { valid_params.merge(name: nil) }

  describe '#persist!' do
    context 'when Audio form valid' do
      subject(:task_form) { described_class.new(valid_params) }

      it { expect(task_form.valid?).to eq(true) }
    end

    context 'when Audio form invalid' do
      subject(:task_form) { described_class.new(invalid_params) }

      it { expect(task_form.valid?).to eq(false) }
    end
  end

  describe 'Model validations' do
    subject { described_class.new(valid_params) }

    it { is_expected.to be_valid }
  end
end
