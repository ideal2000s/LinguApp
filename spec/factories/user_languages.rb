# frozen_string_literal: true

# == Schema Information
#
# Table name: user_languages
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  language_id :bigint           not null
#  level       :integer          default(0)
#  meta        :jsonb
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :user_language do
    user { '' }
    language { '' }
    level { '' }
    meta { '' }
  end
end
