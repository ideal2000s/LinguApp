# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::ImageHotspot::Form, type: :model do
  let!(:task) { build_stubbed(:image_hotspot_task) }
  let(:valid_params) do
    {
      task: task
    }
  end

  let(:invalid_params) do
    {
      task: nil
    }
  end

  context 'when ImageHotspot form valid' do
    subject(:task_form) { described_class.new(valid_params) }

    it { expect(task_form.valid?).to eq(true) }
  end

  context 'when ImageHotspot form invalid' do
    subject(:task_form) { described_class.new(invalid_params) }

    it { expect(task_form.valid?).to eq(false) }
  end
end
