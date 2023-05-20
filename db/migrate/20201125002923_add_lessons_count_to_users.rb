class AddLessonsCountToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :lessons_count, :integer, null: false, default: 0
    User.find_each { |t| User.reset_counters(t.id, :lessons_count) }
  end
end
