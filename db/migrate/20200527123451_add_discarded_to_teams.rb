class AddDiscardedToTeams < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :discarded_at, :datetime
    add_index :teams, :discarded_at

    add_column :team_users, :discarded_at, :datetime
    add_index :team_users, :discarded_at
  end
end
