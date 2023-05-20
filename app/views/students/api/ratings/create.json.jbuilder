# frozen_string_literal: true

json.rating do
  json.rating_id rating.id
  json.ratings_count lesson.ratings_count
  json.average_rating lesson.total_rating.to_f / lesson.ratings_count
end
