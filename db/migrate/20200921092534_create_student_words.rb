class CreateStudentWords < ActiveRecord::Migration[6.0]
  def change
    create_table :student_words do |t|
      t.references :student, null: false, foreign_key: true
      t.references :word
      t.integer :played_count, default: 0
      t.integer :solved_count, default: 0
      t.datetime :last_played_at
      t.datetime :last_failed_at
      t.datetime :last_solved_at

      t.timestamps
    end

    add_index :student_words, %i[word_id student_id], unique: true
  end
end
