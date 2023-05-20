# frozen_string_literal: true

# == Schema Information
#
# Table name: team_groups
#
#  id                  :bigint           not null, primary key
#  team_id             :bigint
#  language_id         :bigint
#  name                :string           not null
#  level               :integer          not null
#  discarded_at        :datetime
#  archived_at         :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  team_students_count :integer          default(0), not null
#  joinable            :boolean          default(TRUE), not null
#  course_id           :integer
#
class TeamGroup < ApplicationRecord
  include Levelize
  include Discard::Model
  include PublicActivity::Model
  tracked owner: ->(context, _model) { context&.current_user },
          recipient: :team,
          only: %i[create destroy]

  belongs_to :language
  belongs_to :team
  belongs_to :course, optional: true
  has_many :team_students, -> { kept }, class_name: 'TeamStudent', dependent: :nullify, inverse_of: :team_group
  has_many :unarchived_team_students, -> { kept.unarchived },
           class_name: 'TeamStudent',
           dependent: :nullify,
           inverse_of: :team_group
  has_many :students, through: :unarchived_team_students, class_name: 'Student', source: :student

  scope :archived, -> { where.not(archived_at: nil) }
  scope :unarchived, -> { where(archived_at: nil) }
  scope :empty, -> { where(team_students_count: 0) }
  scope :by_language, ->(language_id) { where(language_id: language_id) if language_id.present? }
  scope :joinable, -> { where(joinable: true) }
  scope :language_include, ->(language_ids) { where(language_id: language_ids.split(',').map(&:to_i)) }
  scope :level_include, ->(levels) { where(level: levels.split(',').map { |e| TeamGroup.levels.fetch(e) }) }

  validates :team, presence: true
  validates :name, presence: true, uniqueness: { scope: :team_id, conditions: -> { kept.unarchived } }
  validates :level, presence: true

  # TODO: find a better way to notify teacher
  # before_validation :notify_about_course, on: :update

  def self.ransackable_scopes(_auth_object = nil)
    %w[language_include level_include]
  end

  def archive_group
    team_students.each(&:archive!)
    update(archived_at: Time.zone.now)
    create_activity(:archive, owner: ->(context, _model) { context&.current_user }, recipient: team)
  end

  def unarchive!
    update(archived_at: nil)
    create_activity(:restore, owner: ->(context, _model) { context&.current_user }, recipient: team)
  end

  def archived?
    archived_at.present?
  end

  private

  def notify_about_course
    return unless course && course_id_was != course_id && User.current.present?

    School::Students::Cases::NotifyCourseAssignedToGroup.call(course: course, student: User.current, team: team)
  end
end
