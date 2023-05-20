class AddIpAddressAndTimeZoneToStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :students, :sign_in_count, :integer, default: 0, null: false
    add_column :students, :current_sign_in_at, :datetime
    add_column :students, :last_sign_in_at, :datetime
    add_column :students, :current_sign_in_ip, :string
    add_column :students, :last_sign_in_ip, :string
    add_column :students, :time_zone, :string
  end
end
