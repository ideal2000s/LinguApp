# frozen_string_literal: true

module Admin
  module Dictionary
    class FrequencyCalculatorJob < ApplicationJob
      queue_as :default

      def perform(language)
        ::Dictionary::Word.word_classes.each do |e|
          ::Dictionary::Word.where(language: language, word_class: e).where('occurrences <= ?', 2).update_all(frequency: 0) # rubocop:disable Rails/SkipsModelValidations
          sorted_words = ::Dictionary::Word.where(language: language, word_class: e)
                                           .where('occurrences > ?', 2).order(:occurrences)
          first_bound = 40.8
          frequency = 1
          bound = first_bound
          prev_index = 0
          recalculate_frequency(sorted_words, frequency, first_bound, bound, prev_index)
        end
      end

      private

      def recalculate_frequency(sorted_words, frequency, first_bound, bound, prev_index)
        sorted_words.each_with_index do |word, index|
          if (index + 1) > prev_index + (bound * sorted_words.count / 100).round
            frequency += 1
            break if frequency > 6

            bound = (first_bound / frequency).round(1)
            prev_index = index
          end
          word.frequency = frequency
          word.save!
        end
      end
    end
  end
end
