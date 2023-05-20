class CreatePlans < ActiveRecord::Migration[6.0]
  def change
    create_table :plans do |t|
      t.references :language, null: false, foreign_key: true

      t.string :system_name
      t.jsonb :name_translations, default: {}, null: false

      t.timestamps
    end

    add_index :plans, :system_name, unique: true
  end
end
