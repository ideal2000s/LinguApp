class CreateSkillsTasksJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_table :skills_tasks, id: false do |t|
      t.bigint :skill_id
      t.bigint :task_id
    end

    add_index :skills_tasks, :skill_id
    add_index :skills_tasks, :task_id
  end
end
