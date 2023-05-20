# frozen_string_literal: true

Given(/^as (user|admin) I am on(?: the)? (.*) page/) do |role, path|
  steps %(
    Given I am #{role}
    And I am on #{path} page
  )
end

Given(/^I am(?: (?:an?|the))? user/) do
  @current_user = create(:user, :with_google_identity, role: 'basic', status: :active)
  @identity = @current_user.identities.first
  mock_oauth(@identity)
  visit "/auth/#{@identity.provider}"
end

Given(/^I am(?: (?:an?|the))? admin/) do
  steps %(
    Given I am on admin subdomain
  )
  @current_user = create(:user, :with_google_identity, role: 'admin', status: :active)
  @identity = @current_user.identities.first
  mock_oauth(@identity)
  visit "/auth/#{@identity.provider}"
end

Given(/^I am(?: (?:an?|the))? (team member|team manager|team owner)/) do |role|
  steps %(
    Given I am on teach subdomain
    Given I am user
  )
  role = role.split.last
  @team = create(:team)
  @team_user = create(:team_user, user: @current_user, team: @team, role: role)
  Teams::Cases::SetDefault.call(user: @current_user, team: @team)
end

Given(/^I am(?: (?:a?|the))? school member/) do
  steps %(
    Given I am on school subdomain
    Given I am user
  )
  @team = create(:team, :school)
  @team.update(gdpr_consent_at: Time.zone.now)
  @team_user = create(:team_user, user: @current_user, team: @team, role: 'owner')
  Teams::Cases::SetDefault.call(user: @current_user, team: @team)
end

Given(/^I am another (team member|team manager|team owner)/) do |role|
  steps %(
    Given I am on teach subdomain
    Given I am user
  )
  role = role.split.last
  @team_user = create(:team_user, user: @current_user, team: @team, role: role)
  Teams::Cases::SetDefault.call(user: @current_user, team: @team)
end

Given(/^I am another (user|admin)/) do |role|
  find('#user-navbar').click
  click_link(I18n.t('sign_out'))
  step "I am an #{role}"
end

Given(/^(?:there are )?(\d+)(?: more)?(?: (active|closed))? users/) do |count, status|
  status ||= 'pending'
  create_list(:user, count, status: status)
end

Given('these users:') do |table|
  @users = table.hashes.each_with_object({}) do |user_attributes, hash|
    user = create(:user, user_attributes)
    hash[user_attributes['fname']] = user unless user.closed?
  end
end

When(/^I am on(?: the)? edit admin user page for user (\w+)$/) do |user|
  @user = @users[user]
  step 'I am on the edit admin user page'
end

Then('I can edit my own profile') do
  within('tr', text: @current_user.email) do
    expect(page).to have_link('Edit')
  end
end

Then('I can edit all users') do
  @users.each_value do |user|
    within('tr', text: user.email) do
      expect(page).to have_link('Edit')
    end
  end
end

Then('I cannot edit profiles') do
  @users.values.uniq.each do |user|
    within('tr', text: user.email) do
      expect(page).not_to have_link('Edit')
    end
  end
end

When(/^I change (?:(\w+)'s) role to (.*)$/) do |name, role|
  within('#roles_form') do
    choose "user_role_#{role}", allow_label_click: true
    expect do
      click_button('Save')
    end.to change {
      User.find(@users[name].id).role
    }.from(@users[name].role).to(role)
  end
end

When("I toggle a user's status") do
  pending # Write code here that turns the phrase above into concrete actions
end

Then('it becomes active') do
  pending # Write code here that turns the phrase above into concrete actions
end
