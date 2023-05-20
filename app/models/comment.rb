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
class Comment < ApplicationRecord
  include ::AudioUploader::Attachment(:audio)

  belongs_to :author, polymorphic: true
  belongs_to :commentable, polymorphic: true, counter_cache: :comments_count

  scope :in_a_month_submitted, -> { where('created_at > ?', 1.month.ago) }
end
