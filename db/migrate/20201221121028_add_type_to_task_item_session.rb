class AddTypeToTaskItemSession < ActiveRecord::Migration[6.0]
  def up
    add_column :task_item_sessions, :type, :string
    execute <<-SQL
      UPDATE task_item_sessions
      SET type = regexp_replace(task_sessions.type, 'TaskSession$', 'TaskItemSession')
      FROM task_sessions
      WHERE task_sessions.id = task_item_sessions.task_session_id
    SQL
    change_column_null :task_item_sessions, :type, false
  end

  def down
    remove_column :task_item_sessions, :type
  end
end
