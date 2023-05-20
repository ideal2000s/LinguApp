# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::SelectImage::Form, type: :model do
  let!(:select_image) { build_stubbed(:select_image_task) }
  let(:valid_params) do
    {
      task: select_image
    }
  end

  describe '#persist!' do
    context 'when SelectImageTask form valid' do
      subject(:task_form) { described_class.new(valid_params) }

      it { expect(task_form.valid?).to eq(true) }
    end
  end
end
