class AddTagsToCollections < ActiveRecord::Migration[6.0]
  def change
    add_column :dictionary_collections, :tags, :string, array: true, default: []
  end
end
