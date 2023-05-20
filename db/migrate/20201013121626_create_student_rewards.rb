class CreateStudentRewards < ActiveRecord::Migration[6.0]
  def change
    create_table :student_rewards do |t|
      t.belongs_to :student
      t.belongs_to :reward

      t.timestamps
    end

    add_foreign_key :student_rewards, :students, on_delete: :cascade
    add_foreign_key :student_rewards, :rewards, on_delete: :cascade

    add_index :student_rewards, [:student_id, :reward_id], unique: true
  end
end
