# frozen_string_literal: true

json.extract! task_item_session,
              :id,
              :task_item_id,
              :attempts_count,
              :completed
json.url students_api_task_session_task_item_session_path(task_item_session.task_session_id, task_item_session.id)
