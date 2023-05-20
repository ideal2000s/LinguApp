# frozen_string_literal: true

json.lesson_session do
  if lesson_session.present?
    json.id lesson_session.id
    json.status lesson_session.status
    json.lesson_id lesson_session.lesson_id
    json.task_id lesson_session.current_task&.id
    json.summary lesson_session.summary
    json.progress_summary lesson_session.progress_summary
  else
    json.null!
  end
end
