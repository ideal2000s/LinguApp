class CreateStudentSupportLanguages < ActiveRecord::Migration[6.0]
  def change
    create_table :student_support_languages do |t|
      t.references :student, null: false
      t.references :language, null: false
      t.timestamps
    end
  end
end
