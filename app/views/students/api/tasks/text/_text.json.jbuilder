# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :audio_url
  json.content item.content
end
