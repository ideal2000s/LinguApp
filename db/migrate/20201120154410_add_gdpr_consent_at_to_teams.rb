class AddGdprConsentAtToTeams < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :gdpr_consent_at, :datetime
  end
end
