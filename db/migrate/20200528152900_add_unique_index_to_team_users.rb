class AddUniqueIndexToTeamUsers < ActiveRecord::Migration[6.0]
  def change
    add_index :team_users, [:team_id, :user_id], unique: true, where: "discarded_at IS NULL"
  end
end
