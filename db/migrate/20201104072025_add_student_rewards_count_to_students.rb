class AddStudentRewardsCountToStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :students, :student_rewards_count, :integer, default: 0
    Student.find_each { |e| Student.reset_counters(e.id, :student_rewards_count) }
  end
end
