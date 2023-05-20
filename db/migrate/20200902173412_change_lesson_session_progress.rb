class ChangeLessonSessionProgress < ActiveRecord::Migration[6.0]
  def up
    remove_column :lesson_sessions, :progress
    add_column :lesson_sessions, :progress, :jsonb
  end

  def down
    remove_column :lesson_sessions, :progress
    add_column :lesson_sessions, :progress, :text
  end
end
