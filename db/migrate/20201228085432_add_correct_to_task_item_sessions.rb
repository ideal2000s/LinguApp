class AddCorrectToTaskItemSessions < ActiveRecord::Migration[6.0]
  def change
    add_column :task_item_sessions, :correct, :boolean
  end
end
