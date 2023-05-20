# frozen_string_literal: true

# == Schema Information
#
# Table name: student_jwt_deny_list
#
#  id  :bigint           not null, primary key
#  jti :string           not null
#  exp :datetime         not null
#
FactoryBot.define do
  factory :student_jwt_allow_list, class: 'Student::JwtAllowList' do
    jti { 'randomstring' }
  end
end
