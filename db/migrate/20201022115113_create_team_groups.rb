class CreateTeamGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :team_groups do |t|
      t.belongs_to :team
      t.belongs_to :language
      t.string :name, null: false
      t.integer :level, null: false

      t.datetime :discarded_at, index: true
      t.timestamp :archived_at
      t.timestamps
    end

    add_foreign_key :team_groups, :teams, column: :team_id, on_delete: :cascade
    add_foreign_key :team_groups, :languages, column: :language_id, on_delete: :nullify
    add_index :team_groups, [:team_id, :name], unique: true, where: "discarded_at IS NULL"
    add_index :team_groups, [:team_id, :name], where: "archived_at IS NULL", name: 'index_unarchived_team_groups_on_team_id_and_name'
  end
end
