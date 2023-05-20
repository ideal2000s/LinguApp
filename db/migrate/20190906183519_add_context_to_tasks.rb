class AddContextToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :context, :jsonb, default: {}, null: false
  end
end
