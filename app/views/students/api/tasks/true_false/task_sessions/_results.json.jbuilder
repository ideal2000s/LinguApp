# frozen_string_literal: true

json.items task_session.task_item_sessions do |task_item_session|
  json.extract! task_item_session.task_item, :statement
  json.correct task_item_session.task_item.veracity

  json.item_session do
    json.answer task_item_session.answer
  end
end
