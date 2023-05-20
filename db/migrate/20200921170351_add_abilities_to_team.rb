class AddAbilitiesToTeam < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :abilities, :string, array: true, default: []
  end
end
