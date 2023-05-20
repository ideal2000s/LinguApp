# frozen_string_literal: true

# == Schema Information
#
# Table name: student_target_languages
#
#  id          :bigint           not null, primary key
#  student_id  :bigint
#  language_id :bigint
#  level       :integer          default("undefined"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class StudentTargetLanguage < ApplicationRecord
  include Levelize
  include LiberalEnum

  attribute :active, :boolean, default: false

  belongs_to :student
  belongs_to :language
  has_one :active_student_target,
          class_name: 'Student',
          foreign_key: :active_student_target_language_id,
          inverse_of: :active_student_target_language,
          dependent: :nullify
  liberal_enum :level
  validates :level, inclusion: { in: levels.keys }
  validates :language_id, uniqueness: { scope: :student_id }, presence: true

  after_commit on: %i[create update] do
    student.update(active_student_target_language: self) if active
  end

  def active?
    student.active_student_target_language_id.present? &&
      id == student.active_student_target_language_id
  end
end
