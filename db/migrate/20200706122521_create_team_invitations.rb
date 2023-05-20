# frozen_string_literal: true

class CreateTeamInvitations < ActiveRecord::Migration[6.0]
  def change
    create_table :team_invitations do |t|
      t.references :team_domain, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :status, default: 0

      t.timestamps
    end

    add_index :team_invitations, [:user_id, :team_domain_id], unique: true
  end
end
