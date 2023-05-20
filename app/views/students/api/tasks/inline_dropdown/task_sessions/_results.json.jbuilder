# frozen_string_literal: true

json.instruction task_session.task.instruction.to_s

json.items task_session.task_item_sessions do |task_item_session|
  json.extract! task_item_session.task_item, :answers
  json.statement task_item_session.task_item.clean_statement
  json.solution task_item_session.task_item.correct_answers

  json.item_session do
    json.answer task_item_session.answers
  end
end
