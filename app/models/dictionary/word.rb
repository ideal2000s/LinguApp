# frozen_string_literal: true

# == Schema Information
#
# Table name: dictionary_words
#
#  id             :bigint           not null, primary key
#  body           :string           not null
#  prefix         :string           default(""), not null
#  word_class     :integer          default("unknown"), not null
#  description    :string           default(""), not null
#  frequency      :bigint           default(0), not null
#  language_id    :bigint           not null
#  occurrences    :integer          default(0), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  context        :jsonb            not null
#  translations   :jsonb
#  color_required :boolean          default(FALSE)
#
require 'csv'

module Dictionary
  class Word < ApplicationRecord
    self.table_name = :dictionary_words

    WORD_CLASS_ABBR = {
      'n' => 'noun',
      'v' => 'verb',
      'art' => 'determiner',
      'pron' => 'pronoun',
      'prep' => 'preposition',
      'd' => 'determiner',
      'conj' => 'conjunction',
      'subj' => 'subjunction',
      'int' => 'interjection',
      'adj' => 'adjective',
      'adv' => 'adverb',
      'other' => 'other',
      'unknown' => 'unknown'
    }.freeze

    include ::AudioUploader::Attachment(:audio)
    include ::SvgUploader::Attachment(:image)
    include ::AnimationUploader::Attachment(:animation)

    belongs_to :language, class_name: 'Language', inverse_of: :words, counter_cache: :words_count
    has_many :word_collections, dependent: :destroy, foreign_key: 'dictionary_word_id', inverse_of: :word
    has_many :collections, through: :word_collections
    has_many :lesson_phrases, dependent: :destroy, foreign_key: 'phrase_id', inverse_of: :phrase
    has_many :lessons, through: :lesson_phrases
    has_many :import_words, dependent: :destroy, foreign_key: 'dictionary_word_id', inverse_of: :word
    has_many :imports, through: :import_words
    has_many :task_item_words, dependent: :destroy, inverse_of: :word
    has_many :wordplays, dependent: :destroy, inverse_of: :word
    has_many :student_words, dependent: :destroy, inverse_of: :word

    scope :ordered, -> { order('body') }
    scope :by_language, ->(language_id) { where(language_id: language_id) }
    scope :with_audio_by_collection, (lambda do |collection_id|
      joins(:collections).where(dictionary_collections: { id: collection_id }).where("context -> 'audio_data' IS NOT NULL")
    end)
    scope :with_image_by_collection, (lambda do |collection_id|
      joins(:collections).where(dictionary_collections: { id: collection_id }).where("context -> 'image_data' IS NOT NULL")
    end)
    scope :body_alphabetic_start, ->(character) { where('body ILIKE ?', "#{character}%") }
    scope :with_empty_audio, -> { where("context ->> 'audio_data' IS NULL") }
    scope :with_empty_image, -> { where("context ->> 'image_data' IS NULL") }

    validates :body, presence: true
    validates :frequency, numericality: true, inclusion: 0..6

    enum word_class: { unknown: 0, noun: 1, verb: 2, pronoun: 3, preposition: 4,
                       determiner: 5, conjunction: 6, adjective: 7, adverb: 8,
                       interjection: 9, subjunction: 10, phrase: 11, other: 99 }

    store_accessor :context, :audio_data, :image_data, :animation_data

    def self.ransackable_scopes(_auth_object = nil)
      %w[body_alphabetic_start with_empty_audio with_empty_image]
    end

    def self.ransackable_scopes_skip_sanitize_args
      [:body_alphabetic_start]
    end

    def defined?
      return false if description.blank?

      true
    end

    def prefixed_body
      body if prefix.blank?
      "#{prefix} #{body}"
    end

    def translation(target: nil)
      target ||= current_work_language
      return prefixed_body if language.code == target

      translations[target] = translations.fetch(target) do
        EasyTranslate.translate(prefixed_body, from: language.code, to: target)
      end
      save!
      translations[target]
    rescue StandardError => e
      Sentry.capture_exception(e)
      prefixed_body
    end

    def self.word_classes_for_select(type)
      word_classes.map do |k, v|
        [I18n.t(k, scope: 'activerecord.attributes.word.word_classes'), type.zero? ? v : k]
      end
    end

    def self.word_classes_for_filter(type)
      word_classes.map do |k, v|
        [I18n.t(k, scope: 'activerecord.attributes.word.word_classes_abbr'), type.zero? ? v : k]
      end
    end

    def collection_title
      collections.pluck(:name).join(',')
    end

    def self.to_csv
      csv_attributes = %w[phrase_body prefix word_class definition occurrences collection_title]
      word_attributes = %w[body prefix word_class description occurrences collection_title]

      CSV.generate(headers: true) do |csv|
        csv << csv_attributes

        all.find_each do |word|
          csv << word_attributes.map { |m| m == 'word_class' ? WORD_CLASS_ABBR.key(word.send(m)) : word.send(m) }
        end
      end
    end

    private

    def current_work_language
      Student.current&.support_languages&.first&.code || I18n.locale.to_s
    end
  end
end
