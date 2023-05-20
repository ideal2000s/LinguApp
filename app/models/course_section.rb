# frozen_string_literal: true

# == Schema Information
#
# Table name: course_sections
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string           default(""), not null
#  position   :integer          default(0), not null
#
class CourseSection < ApplicationRecord
  belongs_to :course, counter_cache: :sections_count, touch: true
  has_many :lessons, -> { order(position: :asc) }, dependent: :nullify, inverse_of: :course_section
  has_many :base_lessons, (lambda do
    select(:id, :title, :author_id, :phrases_count, :ratings_count, :total_rating, :average_duration, :image_data,
           :course_section_id)
        .kept.published
  end), class_name: 'Lesson'
  acts_as_list scope: %w[course_id], top_of_list: 1, add_new_at: :bottom
end
