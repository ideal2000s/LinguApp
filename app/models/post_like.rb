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
class PostLike < ApplicationRecord
  belongs_to :student
  belongs_to :post, counter_cache: :likes_count
end
