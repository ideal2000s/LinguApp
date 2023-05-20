# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::InlineDropdown::Form, type: :model do
  let!(:task) { build_stubbed(:inline_dropdown_task) }
  let(:valid_params) do
    {
      task: task,
      name: 'test name'
    }
  end

  let(:invalid_params) do
    {
      task: task,
      name: nil
    }
  end

  context 'when InlineDropdownTask form valid' do
    subject(:task_form) { described_class.new(valid_params) }

    it { expect(task_form.valid?).to eq(true) }
  end

  context 'when InlineDropdownTask form invalid' do
    subject(:task_form) { described_class.new(invalid_params) }

    it { expect(task_form.valid?).to eq(false) }
  end
end
