class AddCourseToTeamStudent < ActiveRecord::Migration[6.1]
  def change
    add_column :team_students, :course_id, :integer
    add_index :team_students, :course_id
  end
end
