# frozen_string_literal: true

json.items task_session.task_item_sessions do |task_item_session|
  json.question task_item_session.task_item.clean_question
  json.solution task_item_session.task_item.answers

  json.item_session do
    json.answer task_item_session.answers
  end
end
