class CreateCourseSections < ActiveRecord::Migration[6.0]
  def change
    create_table :course_sections do |t|
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
