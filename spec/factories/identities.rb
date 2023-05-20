# frozen_string_literal: true

# == Schema Information
#
# Table name: identities
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  uid        :string
#  provider   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :identity do
    uid { SecureRandom.hex(4) }
    trait :from_google do
      provider { 'google_user' }
    end
  end
end
