class ChangeTeamStudents < ActiveRecord::Migration[6.0]
  def change
    change_table :team_students do |t|
      t.belongs_to :team_group
    end

    add_foreign_key :team_students, :team_groups, column: :team_group_id, on_delete: :nullify
    add_index :team_students, [:student_id, :team_group_id], unique: true
    add_index :team_students, :team_group_id, order: { team_group_id: 'ASC NULLS FIRST' }, name: 'index_team_students_on_order_team_group_id'
  end
end
