# frozen_string_literal: true

json.instruction task.instruction.to_s
json.items task.functional_items do |item|
  json.extract! item, :id, :type, :position
  json.statement item.prepared_statement
  json.audio_url item.audio&.url
end
