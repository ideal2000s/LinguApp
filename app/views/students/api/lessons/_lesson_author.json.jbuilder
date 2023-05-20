# frozen_string_literal: true

json.author do
  json.name author.name
  json.avatar_url author.avatar_url(:thumbnail)
  json.about author.about
end
