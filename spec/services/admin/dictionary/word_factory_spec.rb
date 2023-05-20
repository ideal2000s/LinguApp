# frozen_string_literal: true

require 'rails_helper'

module Admin
  module Dictionary
    RSpec.describe WordFactory, type: :service do
      let(:language) { languages(:english) }
      let(:phrase) { create(:dictionary_word, language: language) }

      let(:valid_attributes) do
        {
          prefix: 'a',
          body: 'goal',
          description: Faker::Lorem.sentence(word_count: 3),
          frequency: 4,
          word_class: 'noun',
          language_id: language.id
        }
      end

      let(:invalid_attributes) do
        {
          prefix: 'a',
          body: '',
          description: Faker::Lorem.sentence(word_count: 3),
          frequency: 4,
          word_class: 'noun',
          language_id: language.id
        }
      end

      describe '.update' do
        context 'when phrase params are valid' do
          subject(:updated_result) { described_class.update(phrase: phrase, phrase_params: valid_attributes) }

          it { is_expected.to eq(true) }

          it 'updates description correctly' do
            updated_result
            expect(phrase.reload.description).to eq(valid_attributes[:description])
          end
        end

        context 'when image data or audio data is provided' do
          before do
            word_collection
          end

          let(:collection) { create(:dictionary_collection, language: language) }
          let(:word_collection) { create(:dictionary_word_collection, word: phrase, collection: collection) }
          let(:valid_with_image_attributes) do
            {
              prefix: 'a',
              body: 'goal',
              description: Faker::Lorem.sentence(word_count: 3),
              frequency: 4,
              word_class: 'noun',
              language_id: language.id,
              image: Rack::Test::UploadedFile.new(fixtures_path('sample_svg.svg'), 'image/svg+xml')
            }
          end

          let(:valid_with_audio_attributes) do
            {
              prefix: 'a',
              body: 'goal',
              description: Faker::Lorem.sentence(word_count: 3),
              frequency: 4,
              word_class: 'noun',
              language_id: language.id,
              audio: Rack::Test::UploadedFile.new(fixtures_path('audio.mp3'), 'audio/mpeg')
            }
          end

          it 'updates word_with_image_count' do
            described_class.update(phrase: phrase, phrase_params: valid_with_image_attributes)
            expect(collection.reload.word_with_image_count).to eq(1)
          end

          it 'updates word_with_audio_count' do
            described_class.update(phrase: phrase, phrase_params: valid_with_audio_attributes)
            expect(collection.reload.word_with_audio_count).to eq(1)
          end
        end

        context 'when phrase params are invalid' do
          subject(:updated_result) { described_class.update(phrase: phrase, phrase_params: invalid_attributes) }

          it { is_expected.to eq(false) }
        end
      end
    end
  end
end
