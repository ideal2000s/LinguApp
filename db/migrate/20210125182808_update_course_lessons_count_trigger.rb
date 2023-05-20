class UpdateCourseLessonsCountTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION cc_course__lessons_count() RETURNS trigger
          LANGUAGE plpgsql
      AS
      $func$
      BEGIN
          IF TG_OP IN ('UPDATE', 'DELETE') THEN
              UPDATE "courses"
              SET "lessons_count" = "lessons_count" - 1
              FROM "course_sections"
              WHERE "course_sections"."id" = OLD."course_section_id"
                AND "course_sections"."course_id" = "courses"."id";
          END IF;
          IF TG_OP IN ('INSERT', 'UPDATE') THEN
              UPDATE "courses"
              SET "lessons_count" = "lessons_count" + 1
              FROM "course_sections"
              WHERE "course_sections"."id" = NEW."course_section_id"
                AND "course_sections"."course_id" = "courses"."id";
          END IF;
          RETURN NULL;
      END;
      $func$;

      UPDATE courses SET lessons_count = q.lessons_count 
      FROM (
        SELECT course_id, COUNT(l.id) AS lessons_count
        FROM course_sections cs 
        LEFT JOIN lessons l 
          ON(l.course_section_id = cs.id)
        WHERE
          l.discarded_at IS NULL
        GROUP BY cs.course_id
      ) q
      WHERE q.course_id = courses.id;
    SQL
  end

  def down; end
end
