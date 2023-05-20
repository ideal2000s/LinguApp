class AddAuthorIdToComments < ActiveRecord::Migration[6.0]
  def change
    change_table(:comments) do |t|
      t.references :author, polymorphic: true, null: false
    end
    remove_column :comments, :post_id, :bigint
    add_index :comments, [:author_id, :author_type], :name => "index_comments_author"
    add_index :comments, [:commentable_id, :commentable_type], :name => "index_comments_commentable"
  end
end
