# frozen_string_literal: true

And('Type {string} in search box and press enter') do |query|
  within 'form.phrase-search-form' do
    fill_in 'language_search', with: query
    find(:id, 'language_search').native.send_keys(:enter)
  end
end

And('Select {string} in the frequency dropdown') do |frequency|
  within 'form.phrase-search-form' do
    select frequency, from: 'q_frequency_eq'
  end
end

And('Click {string} button') do |btn_name|
  click_link btn_name
end
