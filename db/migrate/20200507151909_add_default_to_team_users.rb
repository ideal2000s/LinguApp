class AddDefaultToTeamUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :team_users, :default, :boolean, default: false
  end
end
