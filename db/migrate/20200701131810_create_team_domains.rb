# frozen_string_literal: true

class CreateTeamDomains < ActiveRecord::Migration[6.0]
  def change
    create_table :team_domains do |t|
      t.references :team, null: false, foreign_key: true
      t.string :domain, null: false

      t.timestamps
    end
  end
end
