class AddContextToTaskItemOptions < ActiveRecord::Migration[6.0]
  def change
    add_column :task_item_options, :context, :jsonb, default: {}, null: false
  end
end
