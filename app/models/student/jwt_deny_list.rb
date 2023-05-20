# frozen_string_literal: true

# == Schema Information
#
# Table name: student_jwt_deny_list
#
#  id  :bigint           not null, primary key
#  jti :string           not null
#  exp :datetime         not null
#
class Student::JwtDenyList < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist

  self.table_name = 'student_jwt_deny_list'
end
