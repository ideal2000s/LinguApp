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
class LessonReview < ApplicationRecord
  belongs_to :lesson
  belongs_to :author, class_name: 'User', inverse_of: :reviews

  delegate :name, to: :author, prefix: true

  enum status: { rejected: 0, approved: 1 }

  validates :content, presence: true

  scope :ordered, -> { order(created_at: :desc) }
  scope :approved, -> { where(status: :approved) }
end
