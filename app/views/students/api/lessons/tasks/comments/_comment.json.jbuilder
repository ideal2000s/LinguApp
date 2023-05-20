# frozen_string_literal: true

json.extract! comment,
              :id,
              :content,
              :audio_url,
              :created_at
json.author do
  json.partial! comment.author
  json.type comment.author_type
end
