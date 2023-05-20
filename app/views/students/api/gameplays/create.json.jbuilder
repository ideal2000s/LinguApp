# frozen_string_literal: true

json.gameplay do
  json.extract! gameplay, :id, :game_type
end
json.words do
  json.array! words do |word|
    json.extract! word, :id, :body, :frequency
    json.word_translation word.translations[student&.native_language&.code]
    json.image_url word.image&.url
    json.audio_url word.audio&.url
  end
end
