class RenameCandidateColumns < ActiveRecord::Migration[6.0]
  def change
    rename_column :students, :first_name, :fname
    rename_column :students, :last_name, :lname
    add_column :students, :gender, :integer, null: false, default: 0
    add_column :students, :ssn, :string, null: false, default: ''
  end
end
