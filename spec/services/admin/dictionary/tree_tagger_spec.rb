# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::TreeTagger, type: :service do
  let(:text) { 'I go' }
  let(:language) { 'english' }
  let(:tagger_result) { { 'phrases_hash' => { 'I' => 1, 'go' => 1 }, 'phrase_word_class' => { 'I' => 'PP', 'go' => 'VBP' } } }

  describe '.call' do
    it 'works' do
      allow_any_instance_of(described_class).to receive(:run_treetagger).and_return(tagger_result)
      expect(
        described_class.call(text: text, language: language).value
      ).to eq({ phrases_hash: { 'I' => 1, 'go' => 1 }, phrase_word_class: { 'I' => 'PP', 'go' => 'VBP' } })
    end
  end
end
