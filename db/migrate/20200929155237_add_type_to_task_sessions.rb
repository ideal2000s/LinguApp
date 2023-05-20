class AddTypeToTaskSessions < ActiveRecord::Migration[6.0]
  def change
    add_column :task_sessions, :type, :string
    add_index :task_sessions, :type
  end
end
