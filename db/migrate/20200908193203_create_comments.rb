class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string(:content, null: false)
      t.references(:commentable, polymorphic: true, null: false)
      t.bigint(:post_id, null: false)

      t.timestamps
    end
  end
end
