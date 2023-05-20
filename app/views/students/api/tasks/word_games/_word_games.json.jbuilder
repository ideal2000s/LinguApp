# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :game_type, :enabled
end
