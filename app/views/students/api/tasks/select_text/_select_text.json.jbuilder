# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :question, :single_choice, :position
  json.options item.options do |option|
    json.extract! option, :id, :answer, :correct
  end
end
json.video_url task.video_url
