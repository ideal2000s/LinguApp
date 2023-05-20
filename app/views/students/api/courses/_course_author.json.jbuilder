# frozen_string_literal: true

json.author do
  json.name team.name
  json.avatar_url team.image_url(:thumbnail)
  json.about team.about
end
