class AddPhrasesCountToLessons < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :phrases_count, :integer, default: 0
  end
end
