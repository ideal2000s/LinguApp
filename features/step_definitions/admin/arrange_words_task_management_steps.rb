# frozen_string_literal: true

When(/^I submit arrange words form with "([^"]*)" and "([^"]*)"$/) do |arrange_words, additional_words|
  within 'form.new_task_item' do
    fill_in 'task_item_arrange_words', with: arrange_words, fill_options: { clear: :backspace }
    fill_in 'task_item_additional_words', with: additional_words, fill_options: { clear: :backspace }
    click_button 'Save'
  end
end

Then(/^I should see "(.*)" in the task items list/) do |text|
  within '#task_items_container' do
    expect(page).to have_content(text)
  end
end
