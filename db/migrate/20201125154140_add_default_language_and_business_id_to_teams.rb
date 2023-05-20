class AddDefaultLanguageAndBusinessIdToTeams < ActiveRecord::Migration[6.0]
  def change
    change_table(:teams) do |t|
      t.belongs_to :default_language
    end
    add_foreign_key :teams, :languages, column: :default_language_id
    add_column :teams, :business_registration_id, :string
  end
end
