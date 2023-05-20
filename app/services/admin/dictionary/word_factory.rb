# frozen_string_literal: true

module Admin
  module Dictionary
    class WordFactory
      class << self
        def update(phrase:, phrase_params:)
          new.update(phrase: phrase, phrase_params: phrase_params)
        end
      end

      def update(phrase:, phrase_params:)
        prev_audio_data = phrase.audio_data
        prev_image_data = phrase.image_data
        if phrase.update(phrase_params)
          update_audio_word_collection(phrase) if prev_audio_data != phrase.audio_data
          update_image_word_collection(phrase) if prev_image_data != phrase.image_data
          true
        else
          false
        end
      end

      private

      def update_audio_word_collection(word)
        word.word_collections.each do |word_collection|
          words_with_audio_count = ::Dictionary::Word.with_audio_by_collection(word_collection.dictionary_collection_id).count
          word_collection.collection.update_column(:word_with_audio_count, words_with_audio_count)
        end
      end

      def update_image_word_collection(word)
        word.word_collections.each do |word_collection|
          word_with_image_count = ::Dictionary::Word.with_image_by_collection(word_collection.dictionary_collection_id).count
          word_collection.collection.update_column(:word_with_image_count, word_with_image_count)
        end
      end
    end
  end
end
