class CreateLanguages < ActiveRecord::Migration[6.0]
  def change
    create_table :languages do |t|
      t.string :code, null: false
      t.string :system_name, null: false
      t.column :name_translations, :jsonb, null: false, default: {}
      t.column :slug_translations, :jsonb, null: false, default: {}
      t.boolean :active, null: false, default: false

      t.timestamps
    end
    add_index :languages, :code, unique: true
  end
end
