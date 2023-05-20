class AddMetaToTeams < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :meta, :jsonb, null: false, default: {}
  end
end
