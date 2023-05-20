class AddLevelToCourses < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :level, :integer, null: false, default: 0, unsigned: true
  end
end
