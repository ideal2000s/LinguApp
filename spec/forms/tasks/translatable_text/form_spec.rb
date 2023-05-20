# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::TranslatableText::Form, type: :model do
  let!(:task) { build_stubbed(:translatable_text_task) }
  let(:valid_params) do
    {
      task: task
    }
  end

  let(:invalid_params) { valid_params.merge(task: nil) }

  describe 'Model validations' do
    context 'with valid params' do
      subject { described_class.new(valid_params) }

      it { is_expected.to be_valid }
    end

    context 'with invalid params' do
      subject { described_class.new(invalid_params) }

      it { is_expected.to be_invalid }
    end
  end
end
