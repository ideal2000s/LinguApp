class AddRatingsCountAndAverageRatingToLesson < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :ratings_count, :integer, null: false, default: 0
    add_column :lessons, :total_rating, :integer, null: false, default: 0
  end
end
