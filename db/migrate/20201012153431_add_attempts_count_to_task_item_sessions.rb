class AddAttemptsCountToTaskItemSessions < ActiveRecord::Migration[6.0]
  def change
    add_column :task_item_sessions, :attempts_count, :integer, unsigned: true, null: false, default: 0
  end
end
