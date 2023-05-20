# frozen_string_literal: true

When(/^I submit select video task item form with "([^"]*)"$/) do |question|
  within 'form.new_task_item' do
    fill_in 'task_item_question', with: question
    click_button 'Add'
  end
end

When(/^I submit select video task item option form with "([^"]*)"$/) do |answer|
  within 'form.new_item_option' do
    fill_in 'item_option_answer', with: answer
    click_button 'Add answer'
  end
end

Given(/^I have added a "([^"]*)" select video task item$/) do |item|
  step 'I go to current teach lesson edit task page'
  step "I submit select video task item form with \"#{item}\""
  step "I should see \"#{item}\" on the page"
end
