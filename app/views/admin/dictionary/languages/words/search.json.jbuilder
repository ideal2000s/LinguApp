# frozen_string_literal: true

json.items items do |item|
  json.id item.id
  json.text "#{item.body} (#{item.word_class})"
end
