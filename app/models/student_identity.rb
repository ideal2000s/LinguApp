# frozen_string_literal: true

# == Schema Information
#
# Table name: student_identities
#
#  id         :bigint           not null, primary key
#  student_id :bigint           not null
#  uid        :string
#  provider   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class StudentIdentity < ApplicationRecord
  belongs_to :student

  validates :uid, :provider, presence: true

  def provider_code
    provider&.[](/(\w+)_student$/, 1)
  end
end
