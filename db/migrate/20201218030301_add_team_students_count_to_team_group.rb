class AddTeamStudentsCountToTeamGroup < ActiveRecord::Migration[6.0]
  def change
    add_column :team_groups, :team_students_count, :integer, null: false, default: 0
    TeamGroup.find_each { |t| TeamGroup.reset_counters(t.id, :team_students_count) }
  end
end
