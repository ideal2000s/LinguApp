class AddMetaToCourses < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :meta, :jsonb, null: false, default: {}
  end
end
