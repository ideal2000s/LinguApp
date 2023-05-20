class AddCategoriesToExams < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :subject, :integer, null: false, default: 0, unsigned: true
    add_index :tasks, :subject
  end
end
