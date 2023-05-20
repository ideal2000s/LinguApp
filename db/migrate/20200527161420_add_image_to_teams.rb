class AddImageToTeams < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :image_data, :text
  end
end
