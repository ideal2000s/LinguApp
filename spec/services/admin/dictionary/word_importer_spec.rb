# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::WordImporter, type: :service do
  fixtures :all
  let(:phrases_hash) { { 'I' => 1, 'go' => 1 } }
  let(:phrase_word_class) { { 'I' => 'PP', 'go' => 'VBP', '.' => 'SENT' } }
  let(:language) { languages(:english) }

  describe '.call' do
    it 'works' do
      expect do
        described_class.call(language: language, phrases_hash: phrases_hash, phrase_word_class: phrase_word_class).value
      end.to change(Dictionary::Word, :count).by(2)
    end

    it 'skips import for words which are pointed out in words_to_skip' do
      expect do
        described_class.call(
          language: language,
          phrases_hash: phrases_hash,
          phrase_word_class: phrase_word_class,
          words_to_skip: ['go']
        ).value
      end.to change(Dictionary::Word, :count).by(1)
    end
  end
end
