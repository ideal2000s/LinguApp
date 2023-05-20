class PopulateLessonPhrasesCount < ActiveRecord::Migration[6.0]
  def change
    Lesson.find_each do |lesson|
      Lesson.reset_counters(lesson.id, :phrases)
    end
  end
end
