class AddPositionToCourseSections < ActiveRecord::Migration[6.0]
  def change
    add_column :course_sections, :position, :integer, null: false, default: 0, unsigned: true
  end
end
