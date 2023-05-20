class TeamUserIsMemberByDefault < ActiveRecord::Migration[6.0]
  def change
    change_column_default :team_users, :role, from: nil, to: 0
    change_column_null :team_users, :role, false
  end
end
