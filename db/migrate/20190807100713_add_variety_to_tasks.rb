class AddVarietyToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :variety, :string
  end
end
