class AddStudentAssignmentIdToStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :documents, :student_assignment_id, :integer
  end
end
