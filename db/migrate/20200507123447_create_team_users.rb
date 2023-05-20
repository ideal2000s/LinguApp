class CreateTeamUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :team_users do |t|
      t.references :team
      t.references :user
      t.timestamps
    end
  end
end
