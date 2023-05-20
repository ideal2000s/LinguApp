class AddActiveStudentTargetLanguageIdToStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :students, :active_student_target_language_id, :integer, index: true
    add_foreign_key :students, :student_target_languages, column: :active_student_target_language_id
  end
end
