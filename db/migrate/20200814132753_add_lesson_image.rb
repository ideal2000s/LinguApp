class AddLessonImage < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :image_data, :text
  end
end
