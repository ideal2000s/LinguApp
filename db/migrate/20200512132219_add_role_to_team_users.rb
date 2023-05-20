class AddRoleToTeamUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :team_users, :role, :integer
  end
end
