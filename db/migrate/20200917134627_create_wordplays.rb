# frozen_string_literal: true

class CreateWordplays < ActiveRecord::Migration[6.0]
  def change
    create_table :wordplays do |t|
      t.references :word
      t.references :gameplay, null: false, foreign_key: true

      t.timestamps
    end

    add_index :wordplays, %i[word_id gameplay_id], unique: true
  end
end
