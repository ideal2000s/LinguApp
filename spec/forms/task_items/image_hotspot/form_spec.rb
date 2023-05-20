# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TaskItems::ImageHotspot::Form, type: :model do
  let(:word) { create(:dictionary_word) }

  let(:valid_params) do
    {
      word_id: word.id
    }
  end
  let(:invalid_params) { valid_params.merge(word_id: nil) }

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
