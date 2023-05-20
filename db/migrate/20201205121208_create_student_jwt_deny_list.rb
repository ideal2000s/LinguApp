class CreateStudentJwtDenyList < ActiveRecord::Migration[6.0]
  def change
    create_table :student_jwt_deny_list do |t|
      t.string :jti, null: false
      t.column :exp, :timestamptz, null: false
    end
    add_index :student_jwt_deny_list, :jti, unique: true
  end
end
