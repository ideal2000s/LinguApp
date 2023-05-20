# frozen_string_literal: true

Then 'I should see default team name' do
  default_team = @current_user.owned_teams.first
  expect(page).to have_content(default_team.name)
end

When 'I fill in new team form with following data:' do |table|
  attributes = table.hashes.first
  fill_in 'Name', with: attributes[:name]
  click_button 'Save and continue'
end

When 'I click on Edit button for default team' do
  within '#teams__list tbody' do
    step 'I click on Edit link'
  end
end

When(/I change team name to "(.+)"/) do |name|
  within 'form.edit_team' do
    fill_in 'Name', with: name
  end
  click_on 'Save and continue'
end

When(/^I switch to (.+) team$/) do |team|
  find('#user-navbar').click
  click_link team
end

Then(/I click on (.+?) button for "(.+?)" team/) do |button, text|
  within find('tr', text: text) do
    click_on button
  end
end

Then(/^I should be on team onboarding page$/) do
  expect(page).to have_selector('h1', text: 'Welcome to Lingu')
end

When 'I select abilities for team and submit' do
  find('#team_abilities_authoring_label').click
  find('#onboarding_submit').click
end
