class AddTaskItemTranslations < ActiveRecord::Migration[6.0]
  def change
    add_column :task_items, :translations, :jsonb, default: {}
  end
end
