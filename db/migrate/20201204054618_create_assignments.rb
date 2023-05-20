class CreateAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :assignments do |t|
      t.references :team, null: false, foreign_key: true
      t.references :language, null: false, foreign_key: true
      t.string :name, default: '', null: false
      t.integer :context, default: 0, null: false
      t.text :instruction

      t.timestamps
    end
  end
end
