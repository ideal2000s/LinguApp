# frozen_string_literal: true

json.posts do
  json.array! posts do |post|
    json.extract! post, :id, :content, :lesson_id, :comments_count, :likes_count
    json.created_at post.created_at&.iso8601
    json.author do
      json.full_name post.author.full_name
      json.avatar_url post.author.avatar&.url
    end
  end
end
