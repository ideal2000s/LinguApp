# frozen_string_literal: true

# == Schema Information
#
# Table name: students
#
#  id                                 :bigint           not null, primary key
#  fname                              :string
#  lname                              :string
#  email                              :string           default(""), not null
#  mobile                             :string
#  locale                             :string
#  discarded_at                       :datetime
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#  gender                             :integer          default("unknown"), not null
#  ssn                                :string           default(""), not null
#  encrypted_password                 :string           default(""), not null
#  reset_password_token               :string
#  reset_password_sent_at             :datetime
#  remember_created_at                :datetime
#  team_followings_count              :integer          default(0)
#  avatar_data                        :text
#  active_student_target_language_id  :integer
#  student_words_count                :integer          default(0), not null
#  student_rewards_count              :integer          default(0)
#  otp_secret                         :string
#  last_otp_at                        :datetime
#  failed_attempts                    :integer          default(0), not null
#  unlock_token                       :string
#  locked_at                          :datetime
#  native_student_support_language_id :integer
#  sign_in_count                      :integer          default(0), not null
#  current_sign_in_at                 :datetime
#  last_sign_in_at                    :datetime
#  current_sign_in_ip                 :string
#  last_sign_in_ip                    :string
#  time_zone                          :string
#

class Student < ApplicationRecord
  thread_cattr_accessor :current
  devise :otp_authenticatable,
         :lockable,
         :registerable,
         :jwt_authenticatable,
         :trackable, jwt_revocation_strategy: Student::JwtDenyList

  include Discard::Model
  include PgSearch::Model
  include ImageUploader::Attachment(:avatar)
  include PublicActivity::Model
  tracked owner: ->(context, model) { context&.current_user || model },
          only: :create

  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i.freeze

  # attr_accessor :lead
  attribute :lead, :boolean, default: false

  enum gender: { unknown: 0, male: 1, female: 2 }

  has_many :student_identities, dependent: :destroy
  has_many :team_followings, class_name: 'TeamFollower', dependent: :destroy, inverse_of: :student
  has_many :teams, through: :team_followings
  has_many :ratings, dependent: :destroy
  has_many :lesson_sessions, dependent: :destroy
  has_many :lesson_sessions_active, -> { active }, class_name: 'LessonSession', inverse_of: :student
  has_many :lesson_sessions_completed, -> { completed }, class_name: 'LessonSession', inverse_of: :student
  has_many :lessons_active, through: :lesson_sessions_active, source: :lesson
  has_many :lessons_finished, through: :lesson_sessions_completed, source: :lesson
  has_many :post_likes, dependent: :destroy
  has_many :posts, through: :teams
  has_many :gameplays, dependent: :destroy, inverse_of: :student
  has_many :student_rewards, dependent: :destroy
  has_many :student_words, dependent: :destroy, inverse_of: :student

  has_many :student_target_languages, dependent: :destroy, inverse_of: :student
  has_many :target_languages, class_name: 'Language', through: :student_target_languages, source: :language
  belongs_to :active_student_target_language, class_name: 'StudentTargetLanguage', dependent: :destroy, optional: true
  has_one :active_target_language, through: :active_student_target_language, class_name: 'Language', source: :language

  has_many :student_support_languages, dependent: :destroy, inverse_of: :student
  has_many :support_languages, class_name: 'Language', through: :student_support_languages, source: :language
  belongs_to :native_support_language,
             class_name: 'StudentSupportLanguage',
             dependent: :destroy,
             foreign_key: :native_student_support_language_id,
             inverse_of: :student,
             optional: true
  has_one :native_language,
          class_name: 'Language',
          source: :language,
          through: :native_support_language

  has_many :team_students, -> { kept }, class_name: 'TeamStudent', dependent: :destroy, inverse_of: :student
  has_many :school_teams, through: :team_students, source: :team
  has_many :comments, as: :author, dependent: :destroy
  has_many :licenses, through: :team_students
  has_many :active_licenses, through: :team_students
  has_many :plans, through: :active_licenses
  has_many :student_assignments, dependent: :destroy
  has_many :assignments, through: :student_assignments
  has_many :documents, dependent: :destroy
  has_many :lessons, through: :lesson_sessions
  has_many :course_sections, through: :lessons
  has_many :courses, through: :course_sections

  after_discard { team_students.all.discard_all }
  after_undiscard { team_students.all.undiscard_all }

  scope :by_language, (lambda do |language_id|
    joins(:active_student_target_language).where(student_target_languages: { language_id: language_id }) if language_id.present?
  end)

  scope :active_target_language_include, (lambda do |language_ids|
    joins(:active_target_language).where('languages.id = ANY(ARRAY[?])', language_ids.split(',').map(&:to_i))
  end)

  scope :level_include, (lambda do |levels|
    joins(:active_student_target_language)
        .where('student_target_languages.level = ANY(ARRAY[?])',
               levels.split(',').map { |e| StudentTargetLanguage.levels.fetch(e) })
  end)

  delegate :level, to: :active_student_target_language, prefix: :target_language, allow_nil: true

  accepts_nested_attributes_for :student_target_languages, allow_destroy: true
  accepts_nested_attributes_for :student_support_languages, allow_destroy: true

  validates :fname, :lname, presence: true, unless: :lead
  validates :gender, inclusion: { in: Student.genders.keys }

  multisearchable(
    against: %i[fname lname email mobile ssn],
    additional_attributes: ->(student) { { team_ids: student.school_teams.ids } },
    unless: :discarded?
  )

  def self.ransackable_scopes(_auth_object = nil)
    %w[active_target_language_include level_include]
  end

  def full_name
    "#{fname&.titleize} #{lname&.titleize}"
  end
  alias name full_name

  def locale(as_is: false)
    super_locale = super()
    return super_locale if as_is || I18n.available_locales.include?(super_locale&.to_sym)

    I18n.default_locale.to_s
  end

  # Try to avoid sending English emails to new students
  def native_locale
    language = native_language || support_languages.first || active_student_target_language&.language
    return language.code.to_sym if language && I18n.available_locales.include?(language.code.to_sym)

    locale.presence || I18n.default_locale
  end

  def as_json(_options = nil)
    super(only: %i[id fname lname email locale])
  end

  def lesson_time_human
    return nil unless lesson_sessions

    ChronicDuration.output(lesson_sessions.sum(:duration), format: :short, units: 2, limit_to_hours: true)
  end

  def be_email_valid(email)
    EMAIL_REGEX.match(email).present?
  end

  def earned_xp
    gameplays.sum(:xp_earned)
  end

  def initials
    "#{fname[0]}#{lname[0]}".upcase
  rescue StandardError
    '??'
  end

  def search_result
    "#{full_name} <#{email}>"
  end
end
