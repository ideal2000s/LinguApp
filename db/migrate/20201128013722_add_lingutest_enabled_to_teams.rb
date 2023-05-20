class AddLingutestEnabledToTeams < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :lingutest_enabled, :boolean, null: false, default: false
  end
end
