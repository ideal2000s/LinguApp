class ChangeSkills < ActiveRecord::Migration[6.0]
  def change
    drop_table :task_skills

    create_table :lesson_skills do |t|
      t.references :lesson
      t.references :skill
    end
  end
end
