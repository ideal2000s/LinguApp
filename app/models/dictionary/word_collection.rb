# frozen_string_literal: true

# == Schema Information
#
# Table name: dictionary_word_collections
#
#  id                       :bigint           not null, primary key
#  dictionary_word_id       :bigint           not null
#  dictionary_collection_id :bigint           not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#
module Dictionary
  class WordCollection < ApplicationRecord
    self.table_name = :dictionary_word_collections

    belongs_to :word, foreign_key: :dictionary_word_id, inverse_of: :word_collections
    belongs_to :collection, foreign_key: :dictionary_collection_id, inverse_of: :word_collections
    counter_culture :collection, column_name: :words_count
    counter_culture :collection, column_name: proc { |model| model.word.audio.present? ? :word_with_audio_count : nil }
    counter_culture :collection, column_name: proc { |model| model.word.image.present? ? :word_with_image_count : nil }
  end
end
