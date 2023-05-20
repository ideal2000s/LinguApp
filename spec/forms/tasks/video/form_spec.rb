# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::Video::Form, type: :model do
  let(:video) { build_stubbed(:video_task) }
  let(:valid_params) do
    {
      task: video,
      name: 'name',
      introduction: 'Introduction'
    }
  end
  let(:invalid_params) { valid_params.merge(name: nil) }

  describe '#persist!' do
    context 'when Video form valid' do
      subject(:task_form) { described_class.new(valid_params) }

      it { expect(task_form.valid?).to eq(true) }
    end

    context 'when Video form invalid' do
      subject(:task_form) { described_class.new(invalid_params) }

      it { expect(task_form.valid?).to eq(false) }
    end
  end

  describe 'Model validations' do
    subject { described_class.new(valid_params) }

    it { is_expected.to be_valid }
  end
end
