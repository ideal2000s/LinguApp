# frozen_string_literal: true

class CreateDictionaryCollections < ActiveRecord::Migration[6.0]
  def change
    create_table :dictionary_collections do |t|
      t.string(:name, null: false)
      t.integer(:level)
      t.bigint(:language_id, null: false)

      t.bigint :words_count, null: false, default: 0, unsigned: true
      t.bigint :word_with_audio_count, null: false, default: 0, unsigned: true
      t.bigint :word_with_image_count, null: false, default: 0, unsigned: true

      t.timestamps
    end
  end
end
