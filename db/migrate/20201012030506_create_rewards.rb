class CreateRewards < ActiveRecord::Migration[6.0]
  def change
    create_table :rewards do |t|
      t.belongs_to :language
      t.string :name, null: false
      t.string :description
      t.text :image_data
      t.integer :kind, null: false, default: 0
      t.integer :dimension, null: false, default: 0
      t.integer :value

      t.datetime :discarded_at, index: true
      t.timestamps
    end

    add_foreign_key :rewards, :languages, column: :language_id
    add_index :rewards, [:language_id, :name], unique: true, where: "discarded_at IS NULL"
  end
end
