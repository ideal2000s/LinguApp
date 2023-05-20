# frozen_string_literal: true

# == Schema Information
#
# Table name: lesson_phrases
#
#  id         :bigint           not null, primary key
#  lesson_id  :bigint
#  phrase_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class LessonPhrase < ApplicationRecord
  belongs_to :lesson, counter_cache: :phrases_count
  belongs_to :phrase, class_name: 'Dictionary::Word', inverse_of: :lesson_phrases

  scope :ordered, -> { includes(:phrase).order('dictionary_words.body') }

  delegate :body, to: :phrase
end
