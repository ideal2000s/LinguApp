# frozen_string_literal: true

And(/^Fill in the crawler form with following and submit:$/) do |table|
  attributes = table.hashes.first

  within '#new_dictionary_crawler' do
    fill_in 'dictionary_crawler_url', with: attributes[:url]
    select attributes[:language], from: 'dictionary_crawler_language'
    click_button 'commit'
  end
end

Then('I should see the {string} in the crawlers page') do |url|
  expect(page).to have_content(url)
end
