# frozen_string_literal: true

# == Schema Information
#
# Table name: dictionary_collections
#
#  id                    :bigint           not null, primary key
#  name                  :string           not null
#  level                 :integer
#  language_id           :bigint           not null
#  words_count           :bigint           default(0), not null
#  word_with_audio_count :bigint           default(0), not null
#  word_with_image_count :bigint           default(0), not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  tags                  :string           default([]), is an Array
#
module Dictionary
  class Collection < ApplicationRecord
    self.table_name = :dictionary_collections
    include Tags
    include Levelize

    belongs_to :language, class_name: 'Language', inverse_of: :collections, counter_cache: :collections_count
    has_many :word_collections, dependent: :destroy, foreign_key: 'dictionary_collection_id', inverse_of: :collection
    has_many :words, through: :word_collections
    accepts_nested_attributes_for :words

    ransacker :audio_percentage do
      Arel.sql('(word_with_audio_count::decimal/words_count)')
    end

    ransacker :image_percentage do
      Arel.sql('(word_with_image_count::decimal/words_count)')
    end

    validates :name, presence: true, uniqueness: { scope: :language_id }
  end
end
