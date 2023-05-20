class CreateOAuthApps < ActiveRecord::Migration[6.0]
  def change
    create_table :oauth_apps, id: :uuid do |t|
      t.string :name, null: false
      t.string :secret, null: false
      t.string :redirect_uris, null: false, array: true, default: []
      t.integer :team_id
      t.jsonb :client_data, null: false, default: {}

      t.timestamps
    end
  end
end
