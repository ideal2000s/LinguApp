# frozen_string_literal: true

And(/^Click invite students link$/) do
  click_on I18n.t('school.team_students.index.invite_students')
end

Then(/^I should be on school students page$/) do
  expect(page).to have_current_path(school_students_path)
end

And(/^Click invite team users link$/) do
  click_on I18n.t('school.teachers.invite.invite_users')
end

Then(/^I should be on school team users page$/) do
  expect(page).to have_current_path(school_team_users_path)
end
