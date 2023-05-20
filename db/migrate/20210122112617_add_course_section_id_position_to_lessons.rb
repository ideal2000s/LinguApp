class AddCourseSectionIdPositionToLessons < ActiveRecord::Migration[6.0]
  def up
    add_reference :lessons, :course_section, index: true
    add_column :lessons, :position, :integer, null: false, default: 0, unsigned: true

    execute <<-SQL
      UPDATE lessons
      SET course_section_id = (SELECT course_section_id FROM course_lessons WHERE course_lessons.lesson_id = lessons.id limit 1),
          position = COALESCE((SELECT position FROM course_lessons WHERE course_lessons.lesson_id = lessons.id limit 1), 0)
    SQL

    drop_table :course_lessons

    execute <<-SQL
      CREATE TRIGGER cc_insert_delete_courses__lessons_count
          AFTER INSERT OR DELETE
          ON lessons
          FOR EACH ROW
      EXECUTE PROCEDURE cc_course__lessons_count();

      CREATE TRIGGER cc_update_courses__lessons_count
          AFTER UPDATE OF course_section_id
          ON lessons
          FOR EACH ROW
          WHEN (old.course_section_id IS DISTINCT FROM new.course_section_id)
      EXECUTE PROCEDURE cc_course__lessons_count();
    SQL
  end

  def down
    execute <<~SQL
      DROP TRIGGER cc_insert_delete_courses__lessons_count ON lessons;
      DROP TRIGGER cc_update_courses__lessons_count ON lessons;
    SQL
    create_table :course_lessons do |t|
      t.references :course_section, null: false, foreign_key: true
      t.references :lesson, null: false, foreign_key: true
      t.integer :section
      t.integer :position
    end

    execute <<~SQL
      INSERT INTO course_lessons(lesson_id, course_section_id, position) select id as lesson_id, course_section_id, position from lessons where course_section_id IS NOT NULL;
    SQL
    remove_column :lessons, :position
    remove_reference :lessons, :course_section, index: true
  end
end
