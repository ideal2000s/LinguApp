class AddCourseSectionIdToCourseLessons < ActiveRecord::Migration[6.0]
  def change
    add_column :course_lessons, :course_section_id, :integer
  end
end
