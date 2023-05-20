# frozen_string_literal: true

# == Schema Information
#
# Table name: lesson_sessions
#
#  id                      :bigint           not null, primary key
#  lesson_id               :bigint
#  student_id              :bigint
#  current_task_session_id :bigint
#  status                  :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  progress                :jsonb
#  duration                :integer
#
class LessonSession < ApplicationRecord
  include PublicActivity::Model

  belongs_to :lesson
  belongs_to :student
  belongs_to :current_task_session, class_name: 'TaskSession', optional: true, dependent: :destroy

  has_one :current_task, through: :current_task_session, class_name: 'Task', source: :task

  has_many :task_sessions, dependent: :destroy

  before_destroy do |record|
    record.current_task_session = nil # to break cyclic dependency with TaskSession
  end

  enum status: { active: 0, completed: 1, canceled: 2 }

  scope :by_student, ->(student) { where(student: student) }
  scope :by_lesson, ->(lesson) { where(lesson: lesson) }
  scope :recent, ->(limit = 30) { order(updated_at: :desc).limit(limit) }

  validates :lesson_id, uniqueness: {
    scope: %i[student_id status],
    conditions: -> { active },
    message: 'Active lesson session already exists'
  }

  def self.find_session!(lesson:, student:)
    by_lesson(lesson).by_student(student).order(created_at: :desc).take!
  end

  def summary
    lesson_summary[:sections]
  end

  def progress_summary
    lesson_summary[:progress]
  end

  def duration_human
    return nil unless duration

    ChronicDuration.output(duration, format: :short, units: 2, limit_to_hours: true)
  end

  def earned_xp
    0
  end

  def progress_percent
    progress_summary[:percents] || 0
  end

  private

  def lesson_summary
    @lesson_summary ||= Lessons::LessonSessionPresenter.call(self)
  end
end
