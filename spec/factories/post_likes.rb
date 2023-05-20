# frozen_string_literal: true

# == Schema Information
#
# Table name: post_likes
#
#  id         :bigint           not null, primary key
#  student_id :bigint           not null
#  post_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :post_like do
    association :student
    association :post
  end
end
