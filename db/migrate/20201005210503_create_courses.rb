class CreateCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :courses do |t|
      t.string :title, null: false
      t.string :description
      t.text :image_data
      t.integer :lessons_count
      t.float :rating

      t.timestamps
    end
  end
end
