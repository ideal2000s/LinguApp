# frozen_string_literal: true

Given(/^I am on (?:the )?new teach task page$/) do
  visit '/teach/tasks/new'
  expect(page).to have_current_path('/teach/tasks/new')
end

When(/^I proceed task type select form with "([^"]*)"$/) do |type|
  select type, from: 'type'
  click_button 'Create'
end

Then(/^I should be on new "([^"]*)" form$/) do |type|
  expect(page).to have_content(type)
end

Given(/^the following skills:$/) do |table|
  @skills = Skill.create(table.hashes)
end

Given(/^the following domains:$/) do |table|
  @domains = Domain.create(table.hashes)
end

When(/^I submit new task form (?:for (teach|engage|test) section )?with the following data:$/) do |section, table|
  section = 'teach' if section.blank?
  within "[data-tasks-subject=#{section}]" do
    click_link I18n.t('teach.tasks.new.new_task')
  end
  @last_form_data = attributes = table.hashes.first
  within '#new_task' do
    fill_in I18n.t('teach.tasks.new.task_name'), with: attributes[:Name]
    find('label', text: attributes[:Type]).click
    click_button I18n.t('common.buttons.save_and_continue')
  end
end

Then(/^I should be on teach task items page$/) do
  expect(page).to have_current_path(teach_task_items_path(Task.last), ignore_query: true)
end

Then(/^I should be on (?:the )?edit teach task page$/) do
  within 'h3' do
    expect(page).to have_content(@last_form_data.fetch('Name'))
  end
  expect(page).to have_field(I18n.t('teach.tasks.headline'))
  expect(page).to have_button(I18n.t('save_changes'))
end

Given(/^I am on (?:the )?edit teach task page$/) do
  visit edit_teach_lesson_task_path(@task.lesson_id, @task)
end

When(/^I submit select text task item form with "([^"]*)"$/) do |question|
  within 'form.new_task_item' do
    fill_in 'task_item_question', with: question
    click_button 'Add'
  end
end

Then(/^I should see "([^"]*)" on the page$/) do |text|
  expect(page).to have_content(text)
end

Given(/^I have added a "([^"]*)" select text task item$/) do |item|
  step 'I go to current teach lesson edit task page'
  step "I submit select text task item form with \"#{item}\""
  step "I should see \"#{item}\" on the page"
end

When(/^I submit select text task item option form with "([^"]*)"$/) do |answer|
  within 'form.new_item_option' do
    fill_in 'item_option_answer', with: answer
    click_button 'Add answer'
  end
end
