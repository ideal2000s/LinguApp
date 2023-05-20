# frozen_string_literal: true

# == Schema Information
#
# Table name: task_sessions
#
#  id                :bigint           not null, primary key
#  task_id           :bigint
#  lesson_session_id :bigint
#  status            :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  type              :string
#  duration          :integer
#
class TaskSession < ApplicationRecord
  belongs_to :task, inverse_of: :task_sessions
  belongs_to :lesson_session, inverse_of: :task_sessions
  has_one :current_lesson_session,
          class_name: 'LessonSession',
          foreign_key: :current_task_session_id,
          dependent: :nullify,
          inverse_of: :current_task_session
  has_many :task_item_sessions, dependent: :destroy, inverse_of: :task_session

  scope :by_task, ->(task) { where(task: task) }
  scope :by_lesson_session, ->(lesson_session) { where(lesson_session: lesson_session) }

  accepts_nested_attributes_for :task_item_sessions

  enum status: { active: 0, completed: 1 }
  delegate :answer_schema, :subject, to: :task

  # TODO: Create index and remove rubocop:disable
  validates :task, uniqueness: { scope: :lesson_session_id } # rubocop:disable Rails/UniqueValidationWithoutIndex

  after_initialize :set_type_from_task, if: :new_record?

  class << self
    def find_session!(lesson_session:, task:)
      by_lesson_session(lesson_session).by_task(task).order(:created_at).first!
    end
  end

  private

  def set_type_from_task
    self.type ||= task_session_klass.name
  end

  def task_session_klass
    task.class.const_get(:TaskSession)
  end
end
