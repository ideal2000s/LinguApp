# frozen_string_literal: true

module Admin
  module Dictionary
    class WordTranslatorJob < ApplicationJob
      queue_as :default

      def perform(word:, source: nil, target: 'en')
        return if word.translations[target].present?

        word.reload
        word.lock!
        word.translations[target] = EasyTranslate.translate(word.prefixed_body, from: source, to: target)
        word.save!
      end
    end
  end
end
