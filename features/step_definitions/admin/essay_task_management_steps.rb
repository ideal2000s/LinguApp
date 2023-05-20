# frozen_string_literal: true

When(/^I submit task form with following data:$/) do |table|
  attributes = table.hashes.first
  within '#new_task' do
    fill_in 'Name', with: attributes[:Name]
    select attributes[:Type], from: 'Type'
    @skills.each do |skill|
      select skill.name, from: 'Skills'
    end
    @domains.each do |domain|
      select domain.name, from: 'Domains'
    end
    click_button 'Save and continue'
  end
end

When(/^I submit minimum words form with "([^"]*)"$/) do |minimum_words|
  within 'form.edit_task_item' do
    fill_in 'task_item_minimum_words', with: minimum_words
    click_button 'Save changes'
  end
end
