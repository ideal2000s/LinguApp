class CreateRatings < ActiveRecord::Migration[6.0]
  def change
    create_table :ratings do |t|
      t.references :student, null: false, foreign_key: true
      t.references :lesson, null: false, foreign_key: true
      t.integer :rate, null: false, default: 0
      t.timestamps
    end
  end
end
