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
class Reward < ApplicationRecord
  include Discard::Model
  include ::BadgeUploader::Attachment(:image)

  MAXIMUM_UPCOMING_REWARDS = 3

  belongs_to :language
  has_many :student_rewards, dependent: :destroy

  enum kind: { badge: 0, merchandise: 1 }
  enum dimension: { word: 0, xp: 1, time: 2 }

  scope :by_language, ->(language_id) { where(language_id: language_id) if language_id.present? }

  validates :name, presence: true, uniqueness: { scope: :language_id, conditions: -> { where(discarded_at: nil) } }
  validates :language, presence: true

  has_rich_text :description
end
