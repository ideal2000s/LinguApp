# frozen_string_literal: true

Given(/^the following tasks?:$/) do |table|
  @tasks = table.hashes.each_with_object({}) do |attributes, hash|
    hash[attributes['name']] = Task.create!(attributes.merge(lesson_id: @lesson.id))
  end
end

Given(/^the following task items?:$/) do |table|
  @task_items = table.hashes.each_with_object({}) do |attributes, hash|
    hash[attributes['name']] = TaskItem.create!(attributes.merge(task: @tasks.values.first))
  end
end

When 'I go to current teach lesson page' do
  visit teach_lesson_path(@lesson)
end

When 'I go to current teach lesson new task page' do
  visit teach_lesson_path(@lesson)
  click_link I18n.t('teach.tasks.new.new_task')
end

When 'I go to current teach lesson edit task page' do
  I18n.locale = :en
  visit edit_teach_lesson_task_path(@lesson, @tasks.values.last)
end

When(/^I click on delete button for the "(.+)" task$/) do |task_name|
  task_id = @tasks.fetch(task_name).id
  within "tr#task_#{task_id}" do
    accept_confirm do
      click_link I18n.t('teach.lessons.task_row.delete')
    end
  end
end

Then(/^I should not see task name "(.+)"$/) do |string|
  expect(page).to_not have_content(string)
end

Then(/^I can edit all tasks$/) do
  pending
end

Then(/^I can toggle any task from visible to hidden$/) do
  pending
end

When(/^I filter tasks by hidden status and A1 level$/) do |_arg|
  pending
end

Then(/^I will only see tasks matching filters$/) do
  pending
end

When(/^I click on down link for the "(.+)" task$/) do |task_name|
  task_id = @tasks.fetch(task_name).id
  within "tr#task_#{task_id}" do
    find('a[data-action="tasks#down"]').click
  end
end

Then(/^I should see the "(.+)" task under the "(.+)" task$/) do |under_task, above_task|
  expect(page).to have_css('tr:first-child', text: above_task)
  expect(page).to have_css('tr:nth-child(2)', text: under_task)
end

Then(/^I can't click on down link for the "(.+)" task$/) do |task_name|
  task_id = @tasks.fetch(task_name).id
  within "tr#task_#{task_id}" do
    link_style = find('a[data-action="tasks#down"]').native.style('pointer-events')
    expect(link_style).to eq('none')
  end
end
