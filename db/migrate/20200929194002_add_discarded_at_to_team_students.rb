class AddDiscardedAtToTeamStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :team_students, :discarded_at, :datetime
    add_index :team_students, :discarded_at
  end
end
