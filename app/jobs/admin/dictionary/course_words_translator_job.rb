# frozen_string_literal: true

module Admin
  module Dictionary
    class CourseWordsTranslatorJob < ApplicationJob
      queue_as :default

      def perform(course:, target: 'en')
        course.phrases.find_each do |word|
          WordTranslatorJob.perform_later(word: word, source: course.language&.code, target: target)
        end
      end
    end
  end
end
