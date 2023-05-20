class AddPositionToTaskItems < ActiveRecord::Migration[6.0]
  def change
    add_column :task_items, :position, :integer, null: false, default: 0, unsigned: true
  end
end
