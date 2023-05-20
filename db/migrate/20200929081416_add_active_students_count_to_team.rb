class AddActiveStudentsCountToTeam < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :active_students_count, :integer, default: 0
  end
end
