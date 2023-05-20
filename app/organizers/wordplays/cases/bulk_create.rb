# frozen_string_literal: true

module Wordplays
  module Cases
    class BulkCreate < Micro::Case::Strict
      attributes :gameplay, :words

      def call!
        create_wordplays

        Success(gameplay: gameplay, words: words)
      end

      private

      def create_wordplays
        Wordplay.insert_all(wordplays_attributes) # rubocop:disable Rails/SkipsModelValidations
      end

      def wordplays_attributes
        words.map do |word|
          { word_id: word.id, gameplay_id: gameplay.id, created_at: Time.zone.now, updated_at: Time.zone.now }
        end
      end
    end
  end
end
