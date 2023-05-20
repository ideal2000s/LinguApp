# frozen_string_literal: true

json.task_item_session do
  json.partial! 'students/api/task_item_sessions/task_item_session', task_item_session: task_item_session
end
