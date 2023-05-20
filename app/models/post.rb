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
class Post < ApplicationRecord
  include Discard::Model

  belongs_to :team
  belongs_to :author, class_name: 'User', inverse_of: :posts
  belongs_to :lesson, optional: true
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :post_likes, dependent: :destroy

  validates :content, presence: true
end
