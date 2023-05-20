# frozen_string_literal: true

# == Schema Information
#
# Table name: tasks
#
#  id                 :bigint           not null, primary key
#  name               :string
#  type               :string           not null
#  introduction       :text
#  complexity         :integer          default("low")
#  performance        :float
#  ordered_solution   :boolean          default(FALSE)
#  discarded_at       :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  context            :jsonb            not null
#  published          :boolean          default(TRUE), not null
#  score_method       :integer          default("fractional"), not null
#  snapshot           :boolean          default(FALSE), not null
#  snapshot_timestamp :datetime
#  parent_id          :integer
#  subject            :integer          default("teach"), not null
#  rank               :integer          default(0)
#  lesson_id          :integer
#  position           :integer
#

class Task < ApplicationRecord
  SNAPSHOT_TABLE = Arel::Table.new(:snapshots, as: :tasks)
  MAIN_TABLE = Arel::Table.new(:main_tasks, as: :tasks)
  RECORDING_TASK_TYPES = %w[Tasks::Audio Tasks::AudioDialogue].freeze
  BASE_ANSWER_SCHEMA = %i[id task_item_id attempts_count].freeze

  include Categorize
  include Discard::Model
  include Tasks::ImageUploader::Attachment(:image)
  include Tasks::AudioUploader::Attachment(:audio)

  belongs_to :lesson
  belongs_to :parent,
             class_name: 'Task',
             optional: true

  has_many :items, class_name: 'TaskItem', dependent: :destroy
  has_many :snapshots,
           -> { where(snapshot: true) },
           class_name: 'Task',
           foreign_key: :parent_id,
           inverse_of: :parent,
           dependent: :nullify

  has_many :task_sessions, dependent: :destroy, inverse_of: :task

  enum complexity: { low: 0, medium: 1, high: 2 }
  enum score_method: { fractional: 0, true_false: 1, manual: 2, no_score: 3 }

  scope :original, -> { where(snapshot: false) }
  scope :snapshots, -> { where(snapshot: true) }
  scope :published, -> { where(published: true) }
  scope :content, -> { where(type: ['Tasks::Video', 'Tasks::Text']) }
  scope :interactive, -> { where.not(type: ['Tasks::Video', 'Tasks::Text']) }
  scope :by_team, ->(team_id) { joins(:lesson).where(lessons: { team_id: team_id }) }

  delegate :level, :author_name, to: :lesson
  delegate :author, to: :lesson, prefix: false, allow_nil: true
  delegate :params_schema, to: :form

  store_accessor :context, :audio_data, :image_data, :image_remote_link, :cover_img
  acts_as_list scope: %w[lesson_id subject], top_of_list: 0, add_new_at: :bottom

  attr_accessor :locale

  validate :check_functional_all!, if: ->(model) { model.published_changed? && model.published? }

  def self.availability
    %w[].freeze
  end

  def self.types
    subclasses.map(&:to_s)
  end

  subjects.each_key do |subject|
    define_singleton_method "#{subject}_types" do
      subclasses
        .select { |klass| klass.availability.include?(subject.to_s) }
        .map(&:to_s)
    end
  end

  def check_functional_all!
    errors.add(:items, :invalid) unless items.all?(&:functional?)
  end

  def self.types_for_select(subject = nil)
    method = subject && respond_to?("#{subject}_types") && :"#{subject}_types" || :types
    send(method).map do |type|
      [I18n.t(type.underscore, scope: 'tasks.types'), type]
    end.sort
  end

  def self.complexities_for_select
    complexities.map do |c|
      [I18n.t(c[0], scope: 'tasks.complexities'), c[0]]
    end
  end

  def self.counts_by_level(dimension) # rubocop:disable Metrics/AbcSize
    basic_counts = all.joins(:level).group('levels.short_name').distinct.count
    all
      .joins(:level).group('levels.short_name')
      .dimension_filter(dimension)
      .distinct.count
      .each_with_object(Hash.new { |ht, k| ht[k] = {} }) do |v, h|
      key = [v[0][0], basic_counts.fetch(v[0][0], 0)]
      h[key][v[0][1]] = v[1]
    end
  end

  def cover_img
    !!super
  end

  def form
    self.class.form
  end

  def self.form
    const_get(:Form)
  end

  def self.answer_schema
    const_get(:BASE_ANSWER_SCHEMA)
  end

  def answer_schema
    self.class.answer_schema
  end

  def snapshot_record
    self
      .class
      .includes(items: :options)
      .find_by(snapshot: true, snapshot_timestamp: updated_at, parent_id: id)
  end

  def self.solution_evaluator
    const_get(:SolutionEvaluator)
  rescue NameError
    Tasks::NullSolutionEvaluator
  end

  def solution_evaluator
    self.class.solution_evaluator
  end

  def readonly?
    persisted? && snapshot?
  end

  def functional_items
    items.filter(&:functional?)
  end

  def acceptable?
    items.any?
  end
end

require_dependency 'tasks/arrange_words'
require_dependency 'tasks/audio'
require_dependency 'tasks/audio_dialogue'
require_dependency 'tasks/audition'
require_dependency 'tasks/dictation'
require_dependency 'tasks/email'
require_dependency 'tasks/embed'
require_dependency 'tasks/essay'
require_dependency 'tasks/fill_gap'
require_dependency 'tasks/fill_in_blanks'
require_dependency 'tasks/fill_in_table'
require_dependency 'tasks/image_hotspot'
require_dependency 'tasks/image_object'
require_dependency 'tasks/inline_dropdown'
require_dependency 'tasks/mark_word'
require_dependency 'tasks/mark_word_audio'
require_dependency 'tasks/select_image'
require_dependency 'tasks/select_text'
require_dependency 'tasks/select_video'
require_dependency 'tasks/sms'
require_dependency 'tasks/speaking'
require_dependency 'tasks/text'
require_dependency 'tasks/translatable_text'
require_dependency 'tasks/true_false'
require_dependency 'tasks/video'
require_dependency 'tasks/webpage'
require_dependency 'tasks/word_games'
