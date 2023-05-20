class AddCompletedToTaskItemSessions < ActiveRecord::Migration[6.0]
  def change
    add_column :task_item_sessions, :completed, :boolean, default: false
  end
end
