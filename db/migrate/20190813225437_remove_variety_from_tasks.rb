class RemoveVarietyFromTasks < ActiveRecord::Migration[5.2]
  def change
    remove_column :tasks, :variety, :string
  end
end
