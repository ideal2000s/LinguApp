# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :statement, :position
  json.correct item.veracity
end
json.video_url task.video_url
