class AddDeviseToStudents < ActiveRecord::Migration[6.0]
  def change
    change_table :students do |t|
      t.string :encrypted_password, null: false, default: ''
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
    end

    change_column :students, :email, :string, null: false, default: ''
    add_index :students, :reset_password_token, unique: true
  end
end
