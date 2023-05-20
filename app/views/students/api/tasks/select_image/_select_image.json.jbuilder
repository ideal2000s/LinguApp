# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :question
  json.options item.options do |option|
    json.extract! option, :id, :correct
    json.image option.image_url(:lesson_ui) if option.image
  end
end
