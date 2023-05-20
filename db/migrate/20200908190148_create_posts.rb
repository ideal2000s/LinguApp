class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text(:content, null: false)
      t.bigint(:team_id, null: false)
      t.bigint(:author_id, null: false)
      t.bigint(:lesson_id)

      t.timestamps
    end
  end
end
