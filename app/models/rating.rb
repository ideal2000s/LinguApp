# frozen_string_literal: true

# == Schema Information
#
# Table name: ratings
#
#  id         :bigint           not null, primary key
#  student_id :bigint           not null
#  lesson_id  :bigint           not null
#  rate       :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Rating < ApplicationRecord
  belongs_to :student
  belongs_to :lesson, counter_cache: :ratings_count
  counter_culture :lesson, column_name: 'total_rating', delta_column: 'rate'

  scope :by_course, (lambda do |course_id|
    joins(:lesson).joins(lesson: :course_section).where(course_sections: { course_id: course_id })
  end)

  validates :rate, numericality: { only_integer: true }, inclusion: { in: 0..5 }
end
