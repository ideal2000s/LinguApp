class CreateTaskItems < ActiveRecord::Migration[5.2]
  def change
    create_table :task_items do |t|
      t.references :task, foreign_key: true
      t.string :type, null: false, index: true
      t.jsonb :context, default: {}, null: false
      t.datetime :discarded_at, index: true

      t.timestamps
    end
  end
end
