class MigrateIntroductionToActionText < ActiveRecord::Migration[6.0]
  class Task < ActiveRecord::Base
    self.table_name = 'tasks'

    has_rich_text :introduction
  end

  def up
    Task.select('tasks.id', 'tasks.introduction as old_introduction').find_each do |task|
      task.update(introduction: task.old_introduction)
    end
  end
end
