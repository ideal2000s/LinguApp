class AddUniqueLessonSessionIndex < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE UNIQUE INDEX lesson_sessions_constraint ON lesson_sessions (lesson_id, student_id, status) WHERE status = 0;
    SQL
  end

  def down
    execute <<-SQL
      DROP INDEX lesson_sessions_constraint;
    SQL
  end
end
