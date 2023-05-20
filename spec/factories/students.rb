# frozen_string_literal: true

# == Schema Information
#
# Table name: students
#
#  id                                 :bigint           not null, primary key
#  fname                              :string
#  lname                              :string
#  email                              :string           default(""), not null
#  mobile                             :string
#  locale                             :string
#  discarded_at                       :datetime
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#  gender                             :integer          default("unknown"), not null
#  ssn                                :string           default(""), not null
#  encrypted_password                 :string           default(""), not null
#  reset_password_token               :string
#  reset_password_sent_at             :datetime
#  remember_created_at                :datetime
#  team_followings_count              :integer          default(0)
#  avatar_data                        :text
#  active_student_target_language_id  :integer
#  student_words_count                :integer          default(0), not null
#  student_rewards_count              :integer          default(0)
#  otp_secret                         :string
#  last_otp_at                        :datetime
#  failed_attempts                    :integer          default(0), not null
#  unlock_token                       :string
#  locked_at                          :datetime
#  native_student_support_language_id :integer
#  sign_in_count                      :integer          default(0), not null
#  current_sign_in_at                 :datetime
#  last_sign_in_at                    :datetime
#  current_sign_in_ip                 :string
#  last_sign_in_ip                    :string
#  time_zone                          :string
#

FactoryBot.define do
  factory :student do
    fname { Faker::Name.first_name }
    lname { Faker::Name.last_name }
    email { Faker::Internet.email }
    mobile { Faker::PhoneNumber.cell_phone }
    locale { 'nb' }
    password { Faker::Internet.password }
  end
end
