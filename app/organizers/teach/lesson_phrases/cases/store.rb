# frozen_string_literal: true

module Teach
  module LessonPhrases
    module Cases
      class Store < Micro::Case::Strict
        attributes :course, :lesson, :phrases

        def call!
          delete_phrases
          store_phrases
          Success()
        rescue StandardError => e
          Failure { e.message }
        end

        def delete_phrases
          lesson.phrases.delete_all
          Lesson.reset_counters(lesson.id, :phrases_count)
        end

        def store_phrases # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
          phrase_text = phrases.reject(&:empty?).join(' ')
          tagger_result = Admin::Dictionary::TreeTagger.call(text: phrase_text,
                                                             language: lesson.language.system_name.strip.downcase.split[0])
          phrases_hash = tagger_result.value[:phrases_hash]
          phrase_word_class = tagger_result.value[:phrase_word_class]
          word_import_result = Admin::Dictionary::WordImporter.call(language: lesson.language,
                                                                    phrases_hash: phrases_hash,
                                                                    phrase_word_class: phrase_word_class,
                                                                    words_to_skip: previous_lesson_phrases)
          Admin::Dictionary::WordImportTracker.call(user: lesson.author, imported_words: word_import_result.value[:words],
                                                    source_type: "lesson_#{lesson.id}")
          import_words = word_import_result.value[:words].select do |w|
            level_frequency_scope[lesson.level.to_s].include?(w.frequency)
          end
          lesson.phrases |= import_words
        end

        private

        def level_frequency_scope
          {
            'zero_level' => [6], 'a1' => [6], 'a2' => [4, 5], 'b1' => [3, 4], 'b2' => [1, 2], 'c1' => [1, 2],
            'undefined' => [0, 1, 2, 3, 4, 5, 6]
          }
        end

        def previous_lesson_phrases
          return [] if course.nil?
          return @previous_lesson_phrases if @previous_lesson_phrases.present?

          previous_lessons_ids = course.lessons.where(
            'lessons.course_section_id < ? OR (lessons.course_section_id = ? AND lessons.position < ?)',
            lesson.course_section_id,
            lesson.course_section_id,
            lesson.position
          ).pluck(:id)
          @previous_lesson_phrases = Dictionary::Word.joins(:lessons).where(lessons: { id: previous_lessons_ids }).pluck(:body)
        end
      end
    end
  end
end
