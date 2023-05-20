class AddCharactersToLanguages < ActiveRecord::Migration[6.0]
  def change
    add_column :languages, :characters, :string, array: true, null: false, default: []
  end
end
