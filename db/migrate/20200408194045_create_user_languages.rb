class CreateUserLanguages < ActiveRecord::Migration[6.0]
  def change
    create_table :user_languages do |t|
      t.references :user, null: false, index: true
      t.references :language, null: false, index: true
      t.integer :level, null: true, default: 0
      t.jsonb :meta

      t.timestamps
    end
  end
end
