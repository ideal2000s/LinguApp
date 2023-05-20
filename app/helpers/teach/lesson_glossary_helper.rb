# frozen_string_literal: true

module Teach
  module LessonGlossaryHelper
    mattr_accessor :level_frequency_scope, instance_writer: false
    self.level_frequency_scope = {
      'a1' => [6], 'zero_level' => [6], 'a2' => [4, 5], 'b1' => [3, 4], 'b2' => [1, 2], 'c1' => [1, 2],
      'undefined' => [0, 1, 2, 3, 4, 5, 6]
    }.freeze

    def phrase_division(phrase, lesson)
      if level_frequency_scope.fetch(lesson.level.to_s, []).include?(phrase.frequency)
        ['badge-soft-secondary', nil]
      else
        ['badge-soft-warning', tooltip_message(phrase)]
      end
    end

    private

    def tooltip_message(phrase)
      lesson_level = level_frequency_scope.map { |k, v| k if v.include?(phrase.frequency) }.compact[0...-1]
      lesson_level.map! { |e| e == 'zero_level' ? '0' : e.upcase }
      if phrase.word_class == 'unknown'
        'This word does not exist in our dictionary'
      else
        "This word is recommended for #{lesson_level.join(' and ')}-level"
      end
    end
  end
end
