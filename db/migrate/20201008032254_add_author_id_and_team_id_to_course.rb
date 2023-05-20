class AddAuthorIdAndTeamIdToCourse < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :author_id, :integer
    add_column :courses, :team_id, :integer
  end
end
