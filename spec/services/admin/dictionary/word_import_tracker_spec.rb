# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::WordImportTracker, type: :service do
  let(:user) { create(:user) }
  let(:language) { languages(:english) }
  let(:imported_words) { [create(:dictionary_word, language: language)] }
  let(:source_type) { 'csv' }

  describe '.call' do
    it 'works' do
      expect do
        described_class.call(user: user, imported_words: imported_words, source_type: source_type).value
      end.to change(Dictionary::Import, :count).by(1)
    end
  end
end
