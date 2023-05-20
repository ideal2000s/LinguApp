class AddSlugToCourses < ActiveRecord::Migration[6.0]
  def change
    change_table(:courses) do |t|
      t.belongs_to :language
      t.column :slug, :string
      t.column :published, :boolean, null: false, default: false
    end

    add_foreign_key :courses, :languages, column: :language_id
    add_index :courses, [:language_id, :slug], unique: true, where: "discarded_at IS NULL"
  end
end
