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
FactoryBot.define do
  factory :student_identity do
    association :student

    provider { 'Google' }
    uid { SecureRandom.hex(4) }
  end
end
