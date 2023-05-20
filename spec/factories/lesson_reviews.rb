# frozen_string_literal: true

# == Schema Information
#
# Table name: lesson_reviews
#
#  id         :bigint           not null, primary key
#  lesson_id  :bigint
#  author_id  :bigint
#  status     :integer
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :lesson_review do
    association :lesson
    association :author, factory: :user
    status { :approved }
    content { Faker::Lorem.sentence(word_count: 10) }
  end
end
