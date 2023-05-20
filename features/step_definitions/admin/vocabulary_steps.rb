# frozen_string_literal: true

When(/^I go to (.+) tab for the lesson "(.+)"$/) do |tab_name, lesson_name|
  step 'I am on teach lessons page'
  step "I click on #{lesson_name} link"
  step "I click on #{tab_name} link"
end

When(/I submit new lesson glossary phrase form with "(.+)"$/) do |string|
  # might need to wait until field clears up after previous input
  within '#glossary__form' do
    fill_in 'lesson_phrase', with: string
    click_button 'Add phrase'
  end
end

Then(/I should see glossary containing "(.+)" on the lesson "(.+)"$/) do |string, lesson_name|
  within '#glossary__items' do
    string.split(',').each do |value|
      value = value.strip.delete_prefix('"').delete_suffix('"')
      expect(page).to have_content(value)
    end
  end
  lesson = Lesson.find_by(title: lesson_name)
  expect(lesson.phrases_count).to eq(string.split(',').count)
end
