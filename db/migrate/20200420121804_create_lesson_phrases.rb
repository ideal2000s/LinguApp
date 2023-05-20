class CreateLessonPhrases < ActiveRecord::Migration[6.0]
  def change
    create_table :lesson_phrases do |t|
      t.references :lesson
      t.references :phrase
      t.timestamps
    end
  end
end
