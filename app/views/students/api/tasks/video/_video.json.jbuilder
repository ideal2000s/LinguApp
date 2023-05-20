# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :url
  json.caption item.caption.to_s.presence
end
