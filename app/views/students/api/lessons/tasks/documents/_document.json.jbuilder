# frozen_string_literal: true

json.extract! document, :id, :content, :audio_url
json.comments document.comments do |comment|
  json.partial! comment
end
