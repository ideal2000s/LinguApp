# frozen_string_literal: true

module Admin
  module Dictionary
    class CollectionTranslatorJob < ApplicationJob
      queue_as :default

      def perform(collection:, target: 'en')
        collection.words.find_each do |word|
          WordTranslatorJob.perform_later(word: word, source: collection.language&.code, target: target)
        end
      end
    end
  end
end
