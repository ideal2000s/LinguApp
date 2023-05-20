class AddCourseToTeamGroup < ActiveRecord::Migration[6.0]
  def change
    add_column :team_groups, :course_id, :integer
    add_index :team_groups, :course_id
  end
end
