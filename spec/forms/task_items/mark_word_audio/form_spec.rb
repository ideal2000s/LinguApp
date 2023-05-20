# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TaskItems::MarkWordAudio::Form, type: :model do
  subject(:form) { described_class.new(params) }

  let(:params) do
    {
      statement: 'Example statement'
    }
  end

  describe 'Model validations' do
    context 'when valid params' do
      it { is_expected.to be_valid }
    end

    context 'when invalid params' do
      let(:params) { super().merge(statement: nil) }

      it { is_expected.to be_invalid }
    end

    it { is_expected.to validate_presence_of(:statement) }
  end
end
