class AddNameToCourseSections < ActiveRecord::Migration[6.0]
  def change
    add_column :course_sections, :name, :string, default: '', null: false
  end
end
