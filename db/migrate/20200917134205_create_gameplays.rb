# frozen_string_literal: true

class CreateGameplays < ActiveRecord::Migration[6.0]
  def change
    create_table :gameplays do |t|
      t.references :student, null: false, foreign_key: true
      t.string :game_type
      t.integer :time_spent, default: 0
      t.integer :attempts, default: 0
      t.datetime :completed_at
      t.integer :xp_earned, default: 0

      t.timestamps
    end
  end
end
