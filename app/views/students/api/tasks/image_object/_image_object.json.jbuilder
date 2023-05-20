# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :top, :left, :width, :height, :audio_url, :instruction
end
json.instruction task.instruction.to_s
json.image_url task.image_url
