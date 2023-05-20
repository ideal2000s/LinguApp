# frozen_string_literal: true

When('I go to {string} language collections page') do |language_name|
  language_id = Language.find_by(system_name: language_name).id
  visit admin_language_collections_path(language_id)
  expect(page).to have_current_path(admin_language_collections_path(language_id), ignore_query: true)
end

And('Type {string} in collection search box and press enter') do |query|
  within 'form.collection-search-form' do
    fill_in 'collection_search', with: query
    find(:id, 'collection_search').native.send_keys(:enter)
  end
end

Then('I should see the collection {string} in the collections table') do |collection_name|
  expect(page).to have_content(collection_name)
end

Then('I should not see the collection {string} in the collections table') do |collection_name|
  expect(page).to have_no_content(collection_name)
end

And('Select {string} in the level dropdown') do |level|
  within 'form.collection-search-form' do
    select level, from: 'q_level_eq'
  end
end
