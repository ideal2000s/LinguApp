class RenameLessonSessionsCurrentTask < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :lesson_sessions, :tasks, column: :current_task_id
    rename_column :lesson_sessions, :current_task_id, :current_task_session_id
    add_foreign_key :lesson_sessions, :task_sessions, column: :current_task_session_id
  end
end
