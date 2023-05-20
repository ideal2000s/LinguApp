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
FactoryBot.define do
  factory :dictionary_collection, class: 'Dictionary::Collection' do
    name { 'MyString' }
    level { 1 }
    language
  end
end
