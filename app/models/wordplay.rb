# frozen_string_literal: true

# == Schema Information
#
# Table name: wordplays
#
#  id          :bigint           not null, primary key
#  word_id     :bigint
#  gameplay_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Wordplay < ApplicationRecord
  belongs_to :word, class_name: 'Dictionary::Word', inverse_of: :wordplays
  belongs_to :gameplay, inverse_of: :wordplays
end
