class AddJoinableToTeamGroup < ActiveRecord::Migration[6.0]
  def change
    add_column :team_groups, :joinable, :boolean, default: true, null: false
  end
end
