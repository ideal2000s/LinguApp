class AddLessonAverageDuration < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :average_duration, :integer
  end
end
