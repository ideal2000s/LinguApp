class AddFieldsToLessons < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :objectives, :string, array: true, null: false, default: []
    add_column :lessons, :kind, :integer, null: false, default: 0
    add_column :lessons, :level, :integer, null: false, default: 0
    add_column :lessons, :meta, :jsonb, null: false, default: {}
    add_column :lessons, :published, :boolean, null: false, default: false
    add_column :lessons, :parent_id, :integer, null: true, index: true
    add_foreign_key :lessons, :lessons, column: :parent_id
    add_reference :lessons, :language, index: true
    add_reference :lessons, :support_language, index: true, column: :support_language_id
  end
end
