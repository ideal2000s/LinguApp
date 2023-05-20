# frozen_string_literal: true

When(/^I am on(?: the)? (.+) page$/) do |path|
  visit path_to(path)
end

Given('I am on main domain') do
  Capybara.app_host = 'http://lvh.me'
end

Given(/^I am on (teach|admin|school) subdomain/) do |subdomain|
  Capybara.app_host = "http://#{subdomain}.lvh.me"
end

When(/^I click on (.+) link$/) do |anchor|
  click_link anchor
end

When(/^I click on (.+) link with confirmation$/) do |anchor|
  accept_confirm do
    click_link anchor
  end
end

Given 'initial skills:' do |table|
  @skills = Skill.create(table.hashes)
end

Then(/^I should see "(.+)" in the input field (.*)$/) do |value, field|
  expect(find("##{field}").value).to eq(value)
end

Then(/^I should see success notice "(.+)"$/) do |string|
  within '.alert-success' do
    expect(page).to have_content(string)
  end
end

Then(/^I should see "(.*)" on the current page$/) do |text|
  expect(page).to have_content(text)
end

Then(/^I should not see "(.*)" on the current page$/) do |text|
  expect(page).not_to have_content(text)
end

And(/^the following languages:$/) do |table|
  @languages =
    table.hashes.each_with_object({}) do |attributes, h|
      h[attributes[:system_name]] =
        Language.create_with(attributes.merge(active: true)).find_or_create_by(code: attributes[:code])
    end
end

And(/^the following students:$/) do |table|
  @students =
    table.hashes.each_with_object({}) do |attributes, h|
      h["#{attributes[:fname].titleize} #{attributes[:lname].titleize}"] =
        Student.where(password: SecureRandom.urlsafe_base64(7), school_team_ids: [@team.id]).create(attributes)
      h.values.last.student_target_languages.create(language: @languages.values[0], level: 'a1')
    end
end

And(/^the following plans:$/) do |table|
  @plans =
    table.hashes.each_with_object({}) do |attributes, h|
      h[attributes[:system_name]] =
        Plan.create_with(attributes.merge(language_id: Language.first&.id))
            .find_or_create_by!(system_name: attributes[:system_name],
                                name_translations: JSON.parse(attributes[:name_translations]),
                                price_cents: 500, price_currency: 'EUR', plan_interval: 'month')
    end
end

Then 'show me the screen' do
  save_and_open_page # rubocop:disable Lint/Debugger
  save_and_open_screenshot # rubocop:disable Lint/Debugger
end

Then(/^I do not see a "(.+)" button$/) do |label|
  expect(page).not_to have_button(label)
end

Then(/^I should see (.+) as (.+) language$/) do |language_name, target|
  expect(find("span.#{target}-language").text).to eq(language_name)
end
