class CreateTaskItemOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :task_item_options do |t|
      t.references :task_item, foreign_key: true
      t.boolean :correct
      t.string :text_option

      t.timestamps
    end
  end
end
