class AddTasksPosition < ActiveRecord::Migration[6.0]
  class Task < ActiveRecord::Base
    belongs_to :lesson
  end

  class Lesson < ActiveRecord::Base
    has_many :tasks
  end

  def change
    add_column :tasks, :position, :integer

    Lesson.includes(:tasks).all.each do |lesson|
      lesson.tasks.order(:id).each_with_index do |task, index|
        task.update_column :position, index
      end
    end
  end
end
