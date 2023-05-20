# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :audio_url, :position
  json.question item.clean_question
  json.solution item.answers
end
json.video_url task.video_url
