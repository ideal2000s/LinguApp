class AddLicenses < ActiveRecord::Migration[6.0]
  def change
    create_table :licenses do |t|
      t.references :team_student, null: false, foreign_key: true
      t.references :plan, null: false, foreign_key: true
      t.datetime :expires_at

      t.timestamps
    end

    add_column :team_students, :active_license_id, :integer, index: true
  end
end
