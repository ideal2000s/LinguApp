class AddTypeToTaskItemOptions < ActiveRecord::Migration[6.0]
  class TaskItem < ApplicationRecord
    self.inheritance_column = nil
  end

  class TaskItemOption < ApplicationRecord
    self.inheritance_column = nil
  end

  def up
    add_column :task_item_options, :type, :string, index: true

    %w[SelectText SelectImage].each do |type|
      TaskItemOption.where(
        task_item_id: TaskItem.where(type: "TaskItems::#{type}").select(:id)
      ).update_all(type: "TaskItemOptions::#{type}")
    end
  end

  def down
    remove_column :task_item_options, :type, :string
  end
end
