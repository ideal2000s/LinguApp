# frozen_string_literal: true

When(/^I submit dictation form with "([^"]*)"$/) do |sentence|
  within 'form.new_task_item' do
    fill_in 'task_item_sentence', with: sentence, fill_options: { clear: :backspace }
    click_button 'Save'
  end
end

Then(/^I should see "(.*)" in the dictation task items list/) do |text|
  within '#task_items_container' do
    expect(page).to have_content(text)
  end
end
