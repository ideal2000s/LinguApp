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
FactoryBot.define do
  factory :lesson_phrase do
    lesson
    association :phrase, factory: :dictionary_word
  end
end
