# frozen_string_literal: true

json.task_session do
  json.partial! 'students/api/task_sessions/task_session', task_session: task_session
end
