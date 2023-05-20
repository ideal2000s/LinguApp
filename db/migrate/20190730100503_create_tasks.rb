class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :type, null: false, index: true
      t.text :introduction
      t.integer :complexity, default: 0
      t.float :performance
      t.boolean :ordered_solution, default: false
      t.boolean :manual_check, default: false
      t.datetime :discarded_at, index: true

      t.timestamps
    end
  end
end
