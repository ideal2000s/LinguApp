class AddOtpToUsersAndStudents < ActiveRecord::Migration[6.0]
  def change
    %i[users students].each do |table|
      change_table table do |t|
        t.string :otp_secret
        t.timestamp :last_otp_at
        t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
        t.string   :unlock_token # Only if unlock strategy is :email or :both
        t.datetime :locked_at
      end
    end
  end
end
