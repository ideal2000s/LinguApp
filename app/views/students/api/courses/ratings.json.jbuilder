# frozen_string_literal: true

json.ratings do
  json.array! ratings do |rating|
    json.extract! rating, :id, :rate
  end
end
json.total_count ratings_count
