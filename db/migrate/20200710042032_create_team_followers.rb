# frozen_string_literal: true

class CreateTeamFollowers < ActiveRecord::Migration[6.0]
  def change
    create_table :team_followers do |t|
      t.references :team, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true

      t.timestamps
    end

    add_index :team_followers, [:team_id, :student_id], unique: true
    add_column :teams, :followers_count, :integer, default: 0
    add_column :students, :team_followings_count, :integer, default: 0
  end
end
