# frozen_string_literal: true

json.rewards do
  json.array! rewards do |reward|
    json.extract! reward, :id, :name, :description, :kind, :dimension, :value, :image_url
    json.language_code reward.language&.code
  end
end
