# frozen_string_literal: true

module Admin
  module Dictionary
    class WordsImporterJob < ApplicationJob
      queue_as :default

      def perform(*args)
        hash = args[0]
        tagger_result = TreeTagger.call(text: hash[:text], language: hash[:language].system_name.strip.downcase.split[0])
        phrases_hash = tagger_result.value[:phrases_hash]
        phrase_word_class = tagger_result.value[:phrase_word_class]

        import_result = WordImporter.call(language: hash[:language], phrases_hash: phrases_hash,
                                          phrase_word_class: phrase_word_class, words_to_skip: [])
        WordImportTracker.call(user: hash[:user], imported_words: import_result.value[:words], source_type: 'text_import')
      end
    end
  end
end
