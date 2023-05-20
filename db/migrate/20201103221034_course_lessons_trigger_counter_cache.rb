class CourseLessonsTriggerCounterCache < ActiveRecord::Migration[6.0]
  def up
    execute <<~SQL
      CREATE OR REPLACE FUNCTION cc_course__lessons_count() RETURNS trigger
          LANGUAGE plpgsql
      AS
      $func$
      BEGIN
          IF TG_OP IN ('UPDATE', 'DELETE') THEN
              UPDATE "courses"
              SET "lessons_count" = COALESCE("lessons_count", 0) - 1
              FROM "course_sections"
              WHERE "course_sections"."id" = OLD."course_section_id"
                AND "course_sections"."course_id" = "courses"."id";
              RETURN NULL;
          END IF;
          IF TG_OP IN ('INSERT', 'UPDATE') THEN
              UPDATE "courses"
              SET "lessons_count" = COALESCE("lessons_count", 0) + 1
              FROM "course_sections"
              WHERE "course_sections"."id" = NEW."course_section_id"
                AND "course_sections"."course_id" = "courses"."id";
              RETURN NULL;
          END IF;
      END;
      $func$;
      
      CREATE TRIGGER cc_insert_delete_courses__lessons_count
          AFTER INSERT OR DELETE
          ON course_lessons
          FOR EACH ROW
      EXECUTE PROCEDURE cc_course__lessons_count();
      
      CREATE TRIGGER cc_update_courses__lessons_count
          AFTER UPDATE OF course_section_id
          ON course_lessons
          FOR EACH ROW
          WHEN (old.course_section_id IS DISTINCT FROM new.course_section_id)
      EXECUTE PROCEDURE cc_course__lessons_count();
    SQL
  end

  def down
    execute <<~SQL
      DROP TRIGGER cc_insert_delete_courses__lessons_count ON course_lessons;
      DROP TRIGGER cc_insert_delete_courses__lessons_count ON course_lessons;
      DROP FUNCTION cc_course__lessons_count()
    SQL
  end
end
