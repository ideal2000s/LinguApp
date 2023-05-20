class RemoveManualCheckFromTasks < ActiveRecord::Migration[6.0]
  def change
    remove_column :tasks, :manual_check, :boolean
    change_column :tasks, :published, :boolean, null: false, default: true
  end
end
