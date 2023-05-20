# frozen_string_literal: true

json.items task_session.task_item_sessions do |task_item_session|
  json.extract! task_item_session.task_item, :question

  json.options task_item_session.task_item.options do |option|
    json.extract! option, :id, :answer, :correct
  end

  json.item_session do
    json.options task_item_session.options
  end
end
