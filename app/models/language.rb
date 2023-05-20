# frozen_string_literal: true

# == Schema Information
#
# Table name: languages
#
#  id                :bigint           not null, primary key
#  code              :string           not null
#  system_name       :string           not null
#  name_translations :jsonb            not null
#  slug_translations :jsonb            not null
#  active            :boolean          default(FALSE), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  support           :boolean          default(FALSE), not null
#  words_count       :integer          default(0), not null
#  collections_count :integer          default(0), not null
#  characters        :string           default([]), not null, is an Array
#  restricted        :boolean          default(FALSE), not null
#  meta              :jsonb            not null
#
class Language < ApplicationRecord
  TT_AVAILABLE_LANG_CODES = %w[en nb fr es da de pt it sv].freeze

  translates :name, :slug

  has_many :courses, dependent: :restrict_with_error
  has_many :lessons, dependent: :nullify
  has_many :rewards, dependent: :restrict_with_error
  has_many :plans, dependent: :restrict_with_error
  has_many :supported_lessons, dependent: :nullify
  has_many :student_target_languages, dependent: :destroy
  has_many :students, through: :student_target_languages
  has_many :teams,
           class_name: 'Team',
           foreign_key: :default_language_id,
           dependent: :nullify,
           inverse_of: :default_language
  has_many :team_groups, dependent: :nullify
  has_many :words,
           class_name: 'Dictionary::Word',
           dependent: :destroy,
           inverse_of: :language
  has_many :collections,
           class_name: 'Dictionary::Collection',
           dependent: :destroy,
           inverse_of: :language

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }
  scope :support, -> { where(support: true) }
  scope :restricted, -> { where(restricted: true) }
  scope :ordered, -> { order(:system_name) }

  store_accessor :meta, %i[translation_note]
end
