class CreatePostLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :post_likes do |t|
      t.bigint(:student_id, null: false)
      t.bigint(:post_id, null: false)

      t.timestamps
    end
  end
end
