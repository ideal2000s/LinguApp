# frozen_string_literal: true

And(/^I click search bar and input search term with "(.+)"$/) do |term|
  @query = term
  fill_in 'q', with: term
  find(:id, 'q').native.send_keys(:enter)
end

Then(/^I should be on school search page$/) do
  expect(page).to have_current_path(school_search_path(q: @query))
end

And(/^I should see "(.+)" on students tab and "(.+)" on teachers tab$/) do |student_email, teacher_email|
  expect(page).to have_content(student_email)
  click_link I18n.t('layouts.school.sidebar.teachers')
  expect(page).to have_content(teacher_email)
end
