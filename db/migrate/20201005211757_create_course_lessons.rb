class CreateCourseLessons < ActiveRecord::Migration[6.0]
  def change
    create_table :course_lessons do |t|
      t.references :course, null: false, foreign_key: true
      t.references :lesson, null: false, foreign_key: true
      t.integer :section
      t.integer :position
    end
  end
end
