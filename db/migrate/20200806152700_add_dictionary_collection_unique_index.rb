class AddDictionaryCollectionUniqueIndex < ActiveRecord::Migration[6.0]
  def change
    add_index :dictionary_collections, [:name, :language_id], unique: true
  end
end
