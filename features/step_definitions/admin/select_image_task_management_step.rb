# frozen_string_literal: true

When(/^I submit select image task item form with "([^"]*)"$/) do |question|
  within 'form.new_task_item' do
    fill_in 'task_item_question', with: question
    click_button 'Add question'
  end
end

Given(/^I have added selected image task item "([^"]*)"$/) do |item|
  step 'I go to current teach lesson edit task page'
  step "I submit select image task item form with \"#{item}\""
  step "I should see \"#{item}\" on the page"
end

When(/^I submit image option form with "([^"]*)" image attached$/) do |image|
  within 'form.new_item_option' do
    attach_file I18n.t('teach.task_item_options.select_image.option_form.item_option_image'),
                Rails.root.join('spec', 'fixtures', 'files', image), visible: false
    click_button 'Save'
  end
end

Then(/^I should see the image "(.+)"$/) do |image|
  expect(page).to have_css("img[title='#{image}']")
end
