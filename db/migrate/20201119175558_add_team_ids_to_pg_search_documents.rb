class AddTeamIdsToPgSearchDocuments < ActiveRecord::Migration[6.0]
  def change
    add_column :pg_search_documents, :team_ids, :integer, array: true, default: []
  end
end
