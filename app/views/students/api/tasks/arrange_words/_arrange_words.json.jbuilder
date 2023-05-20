# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :words, :audio_url, :position
  json.solution item.arrange_words
  json.description item.hint.presence || item.description
end
json.has_demo false
json.instruction task.instruction.to_s
