# frozen_string_literal: true

require 'cucumber/rspec/doubles'

Given(/^these languages:$/) do |table|
  Language.create(table.hashes)
end

Given(/^these phrases:$/) do |table|
  table.hashes.each do |phrase_attributes|
    phrase_attributes['language_id'] = Language.find_by(system_name: phrase_attributes[:language]).id
    phrase_attributes.delete('language')
    create(:dictionary_word, phrase_attributes)
  end
end

When('I go to {string} language phrases page') do |language_name|
  language_id = Language.find_by(system_name: language_name).id
  visit admin_language_words_path(language_id)
  expect(page).to have_current_path(admin_language_words_path(language_id), ignore_query: true)
end

And(/^Click add phrase button$/) do
  click_link 'new_phrase_button'
end

And(/^Fill in the phrase form with following and submit:$/) do |table|
  attributes = table.hashes.first

  within '#new-phrase-modal form' do
    fill_in 'dictionary_word_prefix', with: attributes[:prefix]
    fill_in 'dictionary_word_body', with: attributes[:body]
    fill_in 'dictionary_word_description', with: attributes[:description]
    select attributes[:word_class], from: 'dictionary_word_word_class'
    select attributes[:frequency], from: 'dictionary_word_frequency'
    click_button 'commit'
  end
end

Then('I should see the phrase {string} in the phrases table') do |phrase_name|
  expect(page).to have_content(phrase_name)
end

Then('I should see the error {string}') do |error_message|
  expect(page).to have_content(error_message)
end

Then('I should not see the phrase {string} in the phrases table') do |phrase_name|
  expect(page).to have_no_content(phrase_name)
end

And('Click phrase named {string}') do |phrase_name|
  click_link phrase_name
end

And(/^I check all phrases checkbox$/) do
  check 'check_all_phrase'
end

And(/^Click bulk delete button$/) do
  click_button 'Bulk actions'
  click_link 'btn_delete_phrase'
end

And(/^Click ok on confirm dialog$/) do
  a = page.driver.browser.switch_to.alert
  a.accept
end

Then(/^All the phrases should be deleted$/) do
  expect(find('.table-dashboard tbody', visible: :all)).to have_no_css('*')
end

And(/^Click import button$/) do
  click_link 'Import'
end

And(/^Click upload csv button and choose csv in file select dialog$/) do
  attach_file('Select file', Rails.root.join('spec', 'fixtures', 'files', 'phrases.csv'), make_visible: true)
end

Then('I should see the {string} in the page') do |message|
  expect(page).to have_content(message)
end

And('Fill in the text field with {string}') do |text|
  find(:id, 'parse_text').set(text)
end

And(/^click parse text button$/) do
  RSpec::Mocks.with_temporary_scope do
    tagger_result = { 'phrases_hash' => { 'I' => 1, 'go' => 1 }, 'phrase_word_class' => { 'I' => 'PP', 'go' => 'VBP' } }
    allow_any_instance_of(Admin::Dictionary::TreeTagger).to receive(:run_treetagger).and_return(tagger_result)
    click_button 'Parse text'
  end
end
