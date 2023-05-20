class AddNativeStudentSupportLanguageIdToStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :students, :native_student_support_language_id, :integer
    add_index :students, :native_student_support_language_id
    Student.find_each do |e|
      e.student_support_languages.find_or_create_by(language_id: e.native_language_id).update(native: true) if e.native_language_id.present?
    end
    remove_column :students, :native_language_id, :integer
  end
end
