class AddSupportToLanguages < ActiveRecord::Migration[6.0]
  def change
    add_column :languages, :support, :boolean, null: false, default: false
  end
end
