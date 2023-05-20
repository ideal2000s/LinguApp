class AddLanguageToStudents < ActiveRecord::Migration[6.0]
  def change
    add_reference :students, :language, index: true, optional: true
    add_reference :students, :native_language, index: true, column: :native_language_id
  end
end
