# frozen_string_literal: true

json.post do
  json.extract! post, :id, :content, :lesson_id, :comments_count, :likes_count
  json.author do
    json.avatar_url post.author.avatar&.url
    json.full_name post.author.name
  end
  if lesson
    json.lesson do
      json.title lesson.title
      json.author_name lesson.team.owner.name
      json.avatar_url lesson.team.owner.avatar&.url
    end
  end
  json.comments post.comments do |comment|
    json.author_name comment.author.full_name
    json.avatar_url comment.author.avatar_url
    json.content comment.content
    json.created_at comment.created_at&.iso8601
  end
end
