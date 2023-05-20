# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::SelectVideo::Form, type: :model do
  let!(:select_video) { build_stubbed(:select_video_task) }
  let(:valid_params) do
    {
      task: select_video,
      introduction: 'Introduction'
    }
  end
  let(:invalid_params) { valid_params.merge(name: nil) }

  describe '#persist!' do
    context 'when SelectVideoTask form valid' do
      subject(:task_form) { described_class.new(valid_params) }

      it { expect(task_form.valid?).to eq(true) }
    end

    context 'when SelectVideoTask form invalid' do
      subject(:task_form) { described_class.new(invalid_params) }

      it { expect(task_form.valid?).to eq(false) }
    end
  end
end
