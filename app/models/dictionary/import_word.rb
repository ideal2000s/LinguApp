# frozen_string_literal: true

# == Schema Information
#
# Table name: dictionary_import_words
#
#  id                   :bigint           not null, primary key
#  dictionary_import_id :bigint           not null
#  dictionary_word_id   :bigint           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
module Dictionary
  class ImportWord < ApplicationRecord
    self.table_name = :dictionary_import_words

    belongs_to :import, foreign_key: :dictionary_import_id, inverse_of: :import_words
    belongs_to :word, foreign_key: :dictionary_word_id, inverse_of: :import_words
  end
end
