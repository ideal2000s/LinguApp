class CreateLessonReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :lesson_reviews do |t|
      t.belongs_to :lesson
      t.belongs_to :author
      t.integer :status
      t.text :content
      t.timestamps
    end
  end
end
