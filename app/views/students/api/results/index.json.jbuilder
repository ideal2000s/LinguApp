# frozen_string_literal: true

json.task_items_published_count task_items_published_count
json.task_items_correctly_answered_count task_items_correctly_answered_count
json.tasks task_sessions do |task_session|
  json.extract! task_session.task, :id, :type
  json.title task_session.task.name

  json.partial! task_session.to_partial_path(prefix: 'students/api', partial: 'results'), task_session: task_session
end
