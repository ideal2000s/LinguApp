# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id               :bigint           not null, primary key
#  content          :string           not null
#  commentable_type :string           not null
#  commentable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  author_type      :string           not null
#  author_id        :bigint           not null
#  audio_data       :text
#
FactoryBot.define do
  factory :comment do
    association :commentable
    content { 'Content of the comment' }
  end
end
