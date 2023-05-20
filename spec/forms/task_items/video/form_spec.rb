# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TaskItems::Video::Form, type: :model do
  describe 'Model validations' do
    it { is_expected.to validate_presence_of(:url) }

    shared_examples 'valid video url' do
      subject(:model) { described_class.new(url: url) }

      before { model.validate }

      it 'has no validation errors' do
        expect(model.errors).not_to have_key(:url)
      end
    end

    context 'when youtube link' do
      it_behaves_like 'valid video url' do
        let(:url) { 'https://www.youtube.com/watch?v=WBMHTboH6rA' }
      end
    end

    context 'when short youtube link' do
      it_behaves_like 'valid video url' do
        let(:url) { 'https://youtu.be/WBMHTboH6rA' }
      end
    end

    context 'when wistia link' do
      it_behaves_like 'valid video url' do
        let(:url) { 'https://lingu.wistia.com/medias/1ks4aa52uw' }
      end
    end
  end
end
