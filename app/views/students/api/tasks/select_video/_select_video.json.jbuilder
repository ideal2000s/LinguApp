# frozen_string_literal: true

json.instruction task.instruction.to_s
json.items task.functional_items do |item|
  json.extract! item, :id, :type, :question, :position
  json.video_url item.video_url
  json.options item.options do |option|
    json.extract! option, :id, :answer, :correct
  end
end
