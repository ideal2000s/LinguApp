class CreateLessonSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :lesson_sessions do |t|
      t.belongs_to :lesson
      t.belongs_to :student
      t.belongs_to :current_task
      t.integer :status
      t.integer :progress
      t.timestamps
    end

    add_foreign_key :lesson_sessions, :lessons
    add_foreign_key :lesson_sessions, :students
    add_foreign_key :lesson_sessions, :tasks, column: :current_task_id
  end
end
