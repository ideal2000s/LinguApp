# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TaskItems::Speaking::Form, type: :model do
  let(:valid_params) do
    {
      sentence: 'sentence for new speaking task item'
    }
  end
  let(:invalid_params) { valid_params.merge(sentence: nil) }

  describe 'Model validations' do
    context 'when valid params' do
      subject { described_class.new(valid_params) }

      it { is_expected.to be_valid }
    end

    context 'when invalid params' do
      subject { described_class.new(invalid_params) }

      it { is_expected.to be_invalid }
    end
  end
end
