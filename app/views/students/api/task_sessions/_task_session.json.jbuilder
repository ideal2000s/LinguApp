# frozen_string_literal: true

json.extract! task_session,
              :id,
              :task_id,
              :subject,
              :status
json.url students_api_lesson_session_task_session_path(task_session.lesson_session_id, task_session.id)
