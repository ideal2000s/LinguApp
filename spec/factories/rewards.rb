# frozen_string_literal: true

# == Schema Information
#
# Table name: rewards
#
#  id           :bigint           not null, primary key
#  language_id  :bigint
#  name         :string           not null
#  description  :string
#  image_data   :text
#  kind         :integer          default("badge"), not null
#  dimension    :integer          default("word"), not null
#  value        :integer
#  discarded_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryBot.define do
  sequence :reward_name do |n|
    "Reward #{n}"
  end

  factory :reward do
    name { generate(:reward_name) }
    association :language
  end
end
