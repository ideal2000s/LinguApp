# frozen_string_literal: true

json.instruction task.instruction.to_s
json.characters task.lesson.language.characters
json.items task.functional_items do |item|
  json.extract! item, :id, :sentence, :audio_url, :description, :clean_sentence
end
