class RemoveLanguageIdFromStudents < ActiveRecord::Migration[6.0]
  def change
    remove_column :students, :language_id, :bigint
  end
end
