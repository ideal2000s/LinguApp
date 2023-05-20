class CreateTaskItemWords < ActiveRecord::Migration[6.0]
  def change
    create_table :task_item_words do |t|
      t.references :task_item
      t.references :word
    end
  end
end
