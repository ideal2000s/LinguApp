class RemoveCourseIdFromCourseLessons < ActiveRecord::Migration[6.0]
  def up
    remove_index :course_lessons, :course_id
    remove_column :course_lessons, :course_id
    change_column_null :course_lessons, :course_section_id, false
  end

  def down
    add_reference :course_lessons, :course, index: true
    change_column_null :course_lessons, :course_section_id, true
  end
end
