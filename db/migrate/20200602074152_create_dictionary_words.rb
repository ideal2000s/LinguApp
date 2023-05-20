# frozen_string_literal: true

class CreateDictionaryWords < ActiveRecord::Migration[6.0]
  def change
    create_table :dictionary_words do |t|
      t.string(:body, null: false)
      t.string(:prefix, null: false, default: '')
      t.integer(:word_class, null: false, default: 0)
      t.string(:description, null: false, default: '')
      t.bigint(:frequency, null: false, default: 0)
      t.bigint(:language_id, null: false)

      t.integer :frequency_abs, null: false, default: 0, unsigned: true

      t.timestamps
    end
  end
end
