# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id             :bigint           not null, primary key
#  content        :text             not null
#  team_id        :bigint           not null
#  author_id      :bigint           not null
#  lesson_id      :bigint
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  discarded_at   :datetime
#  likes_count    :integer          default(0), not null
#  comments_count :integer          default(0), not null
#
FactoryBot.define do
  factory :post do
    association :team
    association :author, factory: :user
    # association :lesson
    content { 'Content of the post' }
  end
end
