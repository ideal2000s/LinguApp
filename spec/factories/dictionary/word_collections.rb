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
FactoryBot.define do
  factory :dictionary_word_collection, class: 'Dictionary::WordCollection' do
    association :word, factory: :dictionary_word
    association :collection, factory: :dictionary_collection
  end
end
