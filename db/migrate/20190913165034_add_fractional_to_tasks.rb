class AddFractionalToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :score_method, :integer, null: false, default: 0, unsigned: true
  end
end
