class AddLessonsCountToTeams < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :lessons_count, :integer, null: false, default: 0
    Team.find_each { |t| Team.reset_counters(t.id, :lessons_count) }
  end
end
