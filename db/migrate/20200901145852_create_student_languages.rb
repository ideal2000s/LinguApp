class CreateStudentLanguages < ActiveRecord::Migration[6.0]
  def change
    create_table :student_languages do |t|
      t.references :student
      t.references :language
      t.integer :level, null: false, default: 0
      t.timestamps
    end
  end
end
