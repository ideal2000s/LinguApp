class CreateTaskSession < ActiveRecord::Migration[6.0]
  def change
    create_table :task_sessions do |t|
      t.belongs_to :task
      t.belongs_to :lesson_session
      t.integer :status
      t.timestamps
    end

    add_foreign_key :task_sessions, :tasks
    add_foreign_key :task_sessions, :lesson_sessions
  end
end
