# frozen_string_literal: true

require 'rails_helper'

RSpec.xdescribe TaskItems::AudioDialogue::Form, type: :model do
  let(:valid_params) do
    {
      audio: fixture_file_upload('files/audio.mp3', 'audio/mp3', true),
      partner_name: 'Johnny'
    }
  end
  let(:invalid_params) { valid_params.merge(audio: nil) }

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
