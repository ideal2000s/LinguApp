class ChangeSkillsAndDomains < ActiveRecord::Migration[6.0]
  def up
    drop_table :skills_tasks

    create_table :task_skills do |t|
      t.references :task
      t.references :skill
    end
  end
end
