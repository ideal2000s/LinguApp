class TaskBelongsToLesson < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :lesson_id, :integer
    add_index :tasks, :lesson_id
  end
end
