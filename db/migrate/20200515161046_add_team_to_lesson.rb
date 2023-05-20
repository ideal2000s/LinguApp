class AddTeamToLesson < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :team_id, :integer
    add_index  :lessons, :team_id
  end
end
