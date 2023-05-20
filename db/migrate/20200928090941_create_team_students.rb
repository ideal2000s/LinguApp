class CreateTeamStudents < ActiveRecord::Migration[6.0]
  def change
    create_table :team_students do |t|
      t.references :team, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.timestamp :archived_at
      t.timestamps
    end
  end
end
