# frozen_string_literal: true

# == Schema Information
#
# Table name: courses
#
#  id             :bigint           not null, primary key
#  title          :string           not null
#  description    :string
#  image_data     :text
#  lessons_count  :integer          default(0), not null
#  rating         :float
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  discarded_at   :datetime
#  author_id      :integer
#  team_id        :integer
#  sections_count :integer          default(0)
#  language_id    :bigint
#  slug           :string
#  published      :boolean          default(FALSE), not null
#  level          :integer          default("undefined"), not null
#  meta           :jsonb            not null
#
class Course < ApplicationRecord
  RATINGS_LIMIT = 4
  include Discard::Model
  include Levelize
  include ImageUploader::Attachment(:image)
  include Colors
  include Students::SharedCatalogueFilters
  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :author, class_name: 'User', inverse_of: :courses
  belongs_to :language
  belongs_to :team

  has_many :course_sections, -> { order(:position) }, dependent: :destroy, inverse_of: :course, counter_cache: :sections_count
  has_many :lessons, through: :course_sections
  has_many :phrases, through: :lessons
  has_many :team_groups, dependent: :nullify
  has_many :team_students, dependent: :nullify

  scope :by_team, ->(team_id) { where(team_id: team_id) }
  scope :by_language, ->(language_id) { where(language_id: language_id) if language_id.present? }
  scope :published, -> { where(published: true) }

  validates :language, presence: true
  validates :title, presence: true

  store_accessor :meta, %i[estimated_time frontend_color phrases_count]
  has_rich_text :description

  ransacker :level, formatter: proc { |v| levels[v] }

  accepts_nested_attributes_for :team_groups, allow_destroy: true, reject_if: :all_blank

  def color
    frontend_color.presence || lessons.published.first&.frontend_color
  end

  def set_phrases_count
    update(phrases_count: phrases.uniq.count)
  end

  def ratings_count
    @ratings_count ||= lessons.sum(:ratings_count)
  end

  def task_items_hash_by_subject
    @task_items_hash_by_subject ||= lessons.reorder('')
                                           .joins(tasks: :items)
                                           .select('count(tasks.subject) as task_items_count, tasks.subject as subject')
                                           .group('tasks.subject')
                                           .map { |e| [Task.subjects.key(e.subject), e.task_items_count] }.to_h
  end

  def lessons_avg_rating
    @lessons_avg_rating ||= (lessons.sum(&:rating).to_f / (lessons_count&.nonzero? || 1)).round(1)
  end
end
