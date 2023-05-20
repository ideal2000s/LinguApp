class CreateStudentAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :student_assignments do |t|
      t.references :assignment, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.datetime :passed_at
      t.datetime :deadline
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
