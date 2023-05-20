class CreateTaskItemSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :task_item_sessions do |t|
      t.references :task_session
      t.references :task_item
      t.jsonb :data
      t.jsonb :answer
      t.timestamps
    end
  end
end
