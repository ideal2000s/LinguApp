# frozen_string_literal: true

student_words_indexed = student_words.index_by(&:word_id)

json.lesson_phrases do
  json.array! phrases do |word|
    json.extract! word, :id, :body, :frequency
    json.word_translation word.translation(target: student&.native_language&.code)
    json.image_url word.image&.url
    json.audio_url word.audio&.url
    json.animation_url word.animation&.url
    json.color_required word.color_required
    json.student_word do
      if (student_word = student_words_indexed.fetch(word.id, false))
        json.partial!(student_word)
      else
        json.nil!
      end
    end
  end
end
