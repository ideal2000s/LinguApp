class AddHubspotidToTeams < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :hubspotid, :string, index: true
    add_column :users, :hubspotid, :string, index: true
    add_column :team_users, :hubspot_associated, :boolean, default: false
  end
end
