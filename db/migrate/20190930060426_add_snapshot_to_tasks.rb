class AddSnapshotToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :snapshot, :boolean, null: false, default: false
    add_column :tasks, :snapshot_timestamp, :datetime
    add_column :tasks, :parent_id, :integer
    add_index :tasks, %i[snapshot parent_id snapshot_timestamp]
  end
end
