class AddTaskSessionsDuration < ActiveRecord::Migration[6.0]
  def change
    add_column :task_sessions, :duration, :integer
    add_column :lesson_sessions, :duration, :integer
  end
end
