# frozen_string_literal: true

Given(/^these collections:$/) do |table|
  table.hashes.each do |phrase_attributes|
    phrase_attributes['language_id'] = Language.find_by(system_name: phrase_attributes[:language]).id
    phrase_attributes['word_ids'] = Dictionary::Word.find_by(body: phrase_attributes[:phrases]).id
    phrase_attributes.delete('language')
    phrase_attributes.delete('phrases')
    create(:dictionary_collection, phrase_attributes)
  end
end

And('I update collection {string} with the following data:') do |collection_name, table|
  click_link "#{collection_name}_edit_link"

  attributes = table.hashes.first

  within '#new-collection-modal form' do
    fill_in 'dictionary_collection_name', with: attributes[:name]
    select attributes[:level], from: 'dictionary_collection_level'
    click_button 'commit'
  end
end
