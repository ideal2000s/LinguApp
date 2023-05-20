# frozen_string_literal: true

json.extract! task_session.task, :columns, :h1, :h2, :h3, :question_format
json.audio_question_format task_session.task.audio_question_format?

json.items task_session.task_item_sessions do |task_item_session|
  json.extract! task_item_session.task_item, :question, :audio_url

  json.options task_item_session.task_item.options do |option|
    json.extract! option, :id
    json.answers option.split_answers
  end

  json.item_session do
    json.answer task_item_session.answers
  end
end
