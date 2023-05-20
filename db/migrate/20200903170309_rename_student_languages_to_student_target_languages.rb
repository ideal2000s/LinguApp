class RenameStudentLanguagesToStudentTargetLanguages < ActiveRecord::Migration[6.0]
  def change
    rename_table :student_languages, :student_target_languages
  end
end
