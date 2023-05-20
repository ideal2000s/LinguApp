# frozen_string_literal: true

module Teach
  module LessonPhrases
    module Cases
      class Filter < Micro::Case::Strict
        MIN_LENGTH = 2

        attributes :lesson, :phrases

        def call!
          Success(lesson: lesson, phrases: phrases_filtered)
        end

        private

        def phrases_filtered
          remove_short_words
          remove_numbers
        end

        def remove_short_words
          @phrases = phrases.reject { |e| e.length <= MIN_LENGTH }
        end

        def remove_numbers
          @phrases = phrases.reject { |e| e.match(/^\d+$/) }
        end
      end
    end
  end
end
