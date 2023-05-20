# frozen_string_literal: true

json.array! languages do |language|
  json.extract! language, :id, :code, :system_name, :active, :support, :slug
end
