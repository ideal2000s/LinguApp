# frozen_string_literal: true

# == Schema Information
#
# Table name: lessons
#
#  id                  :bigint           not null, primary key
#  author_id           :bigint
#  title               :string
#  discarded_at        :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  objectives          :string           default([]), not null, is an Array
#  kind                :integer          default("tet"), not null
#  level               :integer          default("undefined"), not null
#  meta                :jsonb            not null
#  published           :boolean          default(FALSE), not null
#  parent_id           :integer
#  language_id         :bigint
#  support_language_id :bigint
#  status              :integer          default("draft"), not null
#  team_id             :integer
#  tags                :string           default([]), is an Array
#  image_data          :text
#  ratings_count       :integer          default(0), not null
#  total_rating        :integer          default(0), not null
#  phrases_count       :integer          default(0)
#  average_duration    :integer
#  course_section_id   :bigint
#  position            :integer          default(0), not null
#
class Lesson < ApplicationRecord
  REVIEW_REWARD = 2
  PUBLISH_SPEND = 1

  include Discard::Model
  include Levelize
  include Tags
  include Colors
  include PgSearch::Model
  include LessonUploader::Attachment(:image)
  include Students::SharedCatalogueFilters

  belongs_to :language
  belongs_to :team, optional: true, counter_cache: :lessons_count
  belongs_to :support_language, class_name: 'Language', inverse_of: :supported_lessons, optional: true
  belongs_to :author, class_name: 'User', inverse_of: :lessons, counter_cache: :lessons_count
  belongs_to :parent, class_name: 'Lesson', inverse_of: :children, optional: true
  belongs_to :course_section, touch: true, optional: true
  has_one :course, through: :course_section

  has_many :children, foreign_key: :parent_id, class_name: 'Lesson', inverse_of: :parent, dependent: :nullify
  has_many :tasks, -> { order(subject: :asc, position: :asc) }, dependent: :destroy, inverse_of: :lesson
  has_many :published_tasks,
           (-> { kept.published.order(subject: :asc, position: :asc) }),
           inverse_of: :lesson,
           class_name: 'Task'
  has_many :lesson_phrases, dependent: :destroy
  has_many :phrases, through: :lesson_phrases
  has_many :reviews, class_name: 'LessonReview', inverse_of: :lesson, dependent: :destroy
  has_many :sessions, class_name: 'LessonSession', inverse_of: :lesson, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :lesson_skills, dependent: :destroy
  has_many :skills, through: :lesson_skills

  store_accessor :meta, %i[description credits frontend_color]

  enum status: { draft: 0, pending: 1, approved: 2 }
  enum kind: { tet: 0, storyline: 1 }

  scope :by_language, ->(language_id) { where(language_id: language_id) if language_id.present? }
  scope :by_author, (->(id) { where(author_id: id) if id.present? })
  scope :not_by_author, (->(id) { where.not(author_id: id) if id.present? })
  scope :approved, -> { where(published: false, status: 'approved') }
  scope :published, -> { where(published: true, status: 'approved') }
  scope :for_review, ->(user) { pending.includes(:author).not_by_author(user) }
  scope :by_team, ->(team_id) { where(team_id: team_id) }
  scope :level_include, (lambda do |level_array|
    where('level = ANY(ARRAY[?])', level_array.split(',').map { |e| Lesson.levels.fetch(e) })
  end)
  scope :language_include, ->(language_ids) { where('language_id = ANY(ARRAY[?])', language_ids.split(',').map(&:to_i)) }
  scope :tagged_with, ->(*tags) { where('lessons.tags && ARRAY[?]::varchar[]', tags) }
  scope :average_duration_between_any, (lambda do |*ranges|
    query = ranges.map { 'lessons.average_duration BETWEEN ? and ?' }.join(' OR ')
    params = ranges.flat_map { |range| range.split('-') }
    where(query, *params)
  end)
  scope :with_support_language, (lambda do |*language_ids|
    where('lessons.support_language_id = ANY(ARRAY[?]::integer[]) OR lessons.support_language_id IS NULL', language_ids)
  end)

  delegate :name, to: :author, prefix: true

  validates :title, presence: true
  validates :language, presence: true

  multisearchable against: :title, unless: :discarded?

  delegate :code, :name, to: :language, prefix: true
  delegate :system_name, to: :support_language, prefix: true, allow_nil: true

  acts_as_list scope: :course_section

  def self.ransackable_scopes(_auth_object = nil)
    super.concat(%w[level_include language_include tagged_with with_support_language average_duration_between_any])
  end

  def skill_names
    skill_names_array = []
    skills.pluck(:name_translations).map { |x| x.each_value { |e| skill_names_array << e } }
    skill_names_array.uniq
  end

  def published!
    toggle!(:published)
  end

  def name_for_select
    "#{title} (#{id})"
  end

  def phrases_list
    phrases.ordered.pluck(:body)
  end

  def rating
    total_rating.to_f / (ratings_count.nonzero? || 1)
  end

  def average_duration_human
    return nil unless sessions

    ChronicDuration.output(average_duration, format: :short, units: 1, limit_to_hours: true)
  end

  def search_result
    "#{title} - #{level.titleize}"
  end

  def last_session
    @last_session ||= sessions.not_canceled.last
  end

  def latest_earned_xp
    last_session&.earned_xp || 0
  end

  def latest_progress_percent
    last_session&.progress_percent || 0
  end

  def latest_duration
    last_session&.duration || 0
  end
end
