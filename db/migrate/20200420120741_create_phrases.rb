class CreatePhrases < ActiveRecord::Migration[6.0]
  def change
    create_table :phrases do |t|
      t.string :value
    end
    add_index :phrases, :value, unique: true
  end
end
