# frozen_string_literal: true

# == Schema Information
#
# Table name: dictionary_imports
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module Dictionary
  class Import < ApplicationRecord
    self.table_name = :dictionary_imports

    belongs_to :user
    has_many :import_words, dependent: :destroy, foreign_key: 'dictionary_import_id', inverse_of: :import
    has_many :words, through: :import_words

    validates :name, presence: true
  end
end
