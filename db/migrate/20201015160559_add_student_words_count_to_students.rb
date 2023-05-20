class AddStudentWordsCountToStudents < ActiveRecord::Migration[6.0]
  def self.up
    add_column :students, :student_words_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :students, :student_words_count
  end
end
