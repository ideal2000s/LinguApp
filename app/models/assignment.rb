# frozen_string_literal: true

# == Schema Information
#
# Table name: assignments
#
#  id          :bigint           not null, primary key
#  team_id     :bigint           not null
#  language_id :bigint           not null
#  name        :string           default(""), not null
#  context     :integer          default("text"), not null
#  instruction :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Assignment < ApplicationRecord
  belongs_to :language
  belongs_to :team
  has_many :student_assignments, dependent: :destroy
  has_many :students, through: :student_assignments
  has_many :team_students, through: :students

  validates :name, presence: true
  validates :instruction, presence: true

  enum context: { text: 0, file: 1, audio: 2 }

  scope :language_include, (lambda do |language_ids|
    where('language_id = ANY(ARRAY[?])', language_ids.split(',').map(&:to_i))
  end)

  scope :types_include, (lambda do |types|
    where('context = ANY(ARRAY[?])', types.split(',').map { |e| Assignment.contexts.fetch(e) })
  end)

  def self.ransackable_scopes(_auth_object = nil)
    %w[language_include types_include]
  end

  def recent_student_assignment(student)
    student_assignments.by_student(student.id).last
  end
end
