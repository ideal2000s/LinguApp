class AddPublishedToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :published, :boolean, null: false, default: false
  end
end
