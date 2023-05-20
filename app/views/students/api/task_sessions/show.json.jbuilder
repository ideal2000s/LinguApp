# frozen_string_literal: true

json.task_session do
  json.partial! 'students/api/task_sessions/task_session', task_session: task_session
  json.partial! task_session
  json.task_item_sessions task_session.task_item_sessions do |task_item_session|
    json.partial! 'students/api/task_item_sessions/task_item_session', task_item_session: task_item_session
    json.partial! task_item_session, as: :task_item_session
  end
  json.partial! 'students/api/lesson_sessions/lesson_session', lesson_session: lesson_session
end
