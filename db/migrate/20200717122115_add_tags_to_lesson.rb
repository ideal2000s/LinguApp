class AddTagsToLesson < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :tags, :string, array: true, default: []
  end
end
