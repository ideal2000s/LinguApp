class SetCoursesLessonsCountDefaultToZero < ActiveRecord::Migration[6.0]
  def change
    Course.where(lessons_count: nil).update_all(lessons_count: 0)
    change_column_default :courses, :lessons_count, from: nil, to: 0
    change_column_null :courses, :lessons_count, false
  end
end
