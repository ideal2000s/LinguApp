# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TaskItems::ArrangeWords::Form, type: :model do
  let(:valid_params) do
    {
      arrange_words: 'I love this city',
      additional_words: 'word1 word2'
    }
  end
  let(:invalid_params) { valid_params.merge(arrange_words: nil) }

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
