class AddDefaultTeamUserIdToUsers < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :default_team_user_id, :integer
    add_index :users, :default_team_user_id

    execute <<-SQL
      UPDATE users
      SET default_team_user_id = (
        SELECT id FROM team_users WHERE users.id = team_users.user_id AND team_users.default = 't' LIMIT 1
      );
    SQL

    rename_column :team_users, :default, :legacy_default
  end

  def down
    execute <<-SQL
      UPDATE team_users
      SET legacy_default = 't'
      WHERE team_users.id IN (
        SELECT default_team_user_id FROM users
      );
    SQL

    rename_column :team_users,:legacy_default, :default
    remove_column :users, :default_team_user_id
  end
end
