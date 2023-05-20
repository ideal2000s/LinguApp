# frozen_string_literal: true

json.instruction task.instruction.to_s
json.items task.functional_items do |item|
  json.extract! item, :id, :type, :answers, :audio_url, :position
  json.statement item.clean_statement
  json.solution item.correct_answers
end
json.video_url task.video_url
