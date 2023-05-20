class AddRestrictedToLanguages < ActiveRecord::Migration[6.0]
  def change
    add_column :languages, :restricted, :boolean, null: false, default: false
  end
end
