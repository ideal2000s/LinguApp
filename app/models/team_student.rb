# frozen_string_literal: true

# == Schema Information
#
# Table name: team_students
#
#  id                :bigint           not null, primary key
#  team_id           :bigint           not null
#  student_id        :bigint           not null
#  archived_at       :datetime
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  discarded_at      :datetime
#  team_group_id     :bigint
#  active_license_id :integer
#  course_id         :integer
#
class TeamStudent < ApplicationRecord
  DESTRUCTION_DAYS = 365
  include Discard::Model
  include PublicActivity::Model
  tracked owner: ->(context, model) { context&.current_user || model.student },
          recipient: :team,
          only: %i[create destroy]

  has_many :licenses, dependent: :destroy
  has_many :plans, through: :licenses

  belongs_to :student
  belongs_to :team
  belongs_to :team_group, optional: true
  belongs_to :active_license, class_name: 'License', dependent: :destroy, optional: true
  belongs_to :course, optional: true
  counter_culture :team_group, column_name: proc { |model| model.kept? && model.archived_at.nil? ? 'team_students_count' : nil }
  counter_culture :team, column_name: proc { |model| model.kept? && model.archived_at.nil? ? 'active_students_count' : nil }

  scope :unarchived, -> { where(archived_at: nil) }
  scope :archived, -> { where.not(archived_at: nil) }
  scope :by_team, ->(team_id) { where(team_id: team_id) }
  scope :students_by_level, (lambda do |level|
    joins(:student).joins(student: :student_target_languages).where(student_target_languages: { level: level })
  end)
  scope :available_plans_by_team, (lambda do |team|
    joins('INNER JOIN licenses ON active_license_id = licenses.id')
      .joins('LEFT JOIN plans license_plans ON licenses.plan_id = license_plans.id')
      .where(team: team)
      .group('license_plans.id')
      .select('license_plans.*')
  end)
  scope :student_language_include, lambda { |language_ids|
                                     joins(student: :active_target_language)
                                       .where('languages.id = ANY(ARRAY[?])', language_ids.split(',').map(&:to_i))
                                   }
  scope :student_level_include, lambda { |levels|
    joins(student: :active_student_target_language)
      .where('student_target_languages.level = ANY(ARRAY[?])',
             levels.split(',').map { |e| StudentTargetLanguage.levels.fetch(e) })
  }
  scope :active_license_include, lambda { |plan_ids|
    has_no_license = plan_ids.include?('-1')
    scope = joins('LEFT JOIN licenses ON active_license_id = licenses.id')
    scope = if has_no_license
              scope.where('licenses.plan_id IS NULL OR licenses.plan_id = ANY(ARRAY[?])', plan_ids.split(',').map(&:to_i))
            else
              scope.where('licenses.plan_id = ANY(ARRAY[?])', plan_ids.split(',').map(&:to_i))
            end
    scope
  }

  after_commit :inherit_language, if: -> { saved_change_to_team_group_id? }
  after_commit :notify_about_course, on: %i[create update], if: -> { saved_change_to_course_id? }

  after_discard do
    create_activity(:discard, owner: ->(context, _model) { context&.current_user }, recipient: student)
  end

  after_undiscard do
    create_activity(:undiscard, owner: ->(context, _model) { context&.current_user }, recipient: student)
  end

  # TODO: Rewrite smelly method
  def inherit_language
    return if student.active_student_target_language_id

    l = student.student_target_languages.find_or_initialize_by(language_id: team_group.language_id)
    l.level = team_group.level
    l.save
    student.update(active_student_target_language: l)
  end

  def self.ransackable_scopes(_auth_object = nil)
    %w[student_language_include student_level_include active_license_include]
  end

  def archive!
    active_license&.revoke
    update!(archived_at: Time.zone.now)
    create_activity(:archive, owner: ->(context, _model) { context&.current_user }, recipient: student)
  end

  def unarchive!
    update!(archived_at: nil)
    team_group.unarchive! if team_group&.archived?
    create_activity(:restore, owner: ->(context, _model) { context&.current_user }, recipient: student)
  end

  def available_plans
    Plan.where.not(id: active_license&.plan_id)
  end

  def scheduled_destruction_date
    return nil unless archived_at

    archived_at + calculate_days.days
  end

  private

  def calculate_days
    return DESTRUCTION_DAYS unless team.destroy_user_data_after.to_i.positive?

    team.destroy_user_data_after.to_i
  end

  def notify_about_course
    return unless course

    School::Students::Cases::NotifyCourseAssignedToGroup.call(course: course, student: student, team: team)
  end
end
