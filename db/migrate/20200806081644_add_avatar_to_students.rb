class AddAvatarToStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :students, :avatar_data, :text
  end
end
