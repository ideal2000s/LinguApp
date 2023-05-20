class AddRankToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :rank, :integer, default: 0
    add_index :tasks, :rank
  end
end
