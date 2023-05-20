# frozen_string_literal: true

class CreateWordCollectionJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_table :dictionary_word_collections do |t|
      t.references(:dictionary_word, null: false, foreign_key: true)
      t.references(:dictionary_collection, null: false, foreign_key: true)
      t.index(%i[dictionary_word_id dictionary_collection_id], unique: true, name: 'index_word_collections_on_word_id_and_collection_id')

      t.timestamps
    end
  end
end
