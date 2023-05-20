# frozen_string_literal: true

# == Schema Information
#
# Table name: student_support_languages
#
#  id          :bigint           not null, primary key
#  student_id  :bigint           not null
#  language_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class StudentSupportLanguage < ApplicationRecord
  attribute :native, :boolean, default: false

  belongs_to :student
  belongs_to :language

  after_commit on: %i[create update] do
    student.update(native_support_language: self) if native
  end

  def native?
    student.native_student_support_language_id.present? &&
      id == student.native_student_support_language_id
  end
end
