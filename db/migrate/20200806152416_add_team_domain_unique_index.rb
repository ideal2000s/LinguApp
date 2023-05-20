class AddTeamDomainUniqueIndex < ActiveRecord::Migration[6.0]
  def change
    add_index :team_domains, [:domain, :team_id], unique: true
  end
end
