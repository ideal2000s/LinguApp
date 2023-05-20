# frozen_string_literal: true

When(/^I go to school dashboard page$/) do
  visit school_dashboard_path
end

When("There's user with email {string}") do |email|
  create(:user, email: email)
end

And(/^Click open main dropdown menu$/) do
  find('.school-nav-bottom .dropdown-toggle').click
end

And(/^Click my profile button$/) do
  find(".school-nav-bottom a[href='/user/edit']").click
end

And(/^Fill in the user form with following and submit:$/) do |table|
  attributes = table.hashes.first

  within '#school-main-modal' do
    fill_in 'user_fname', with: attributes[:fname]
    fill_in 'user_lname', with: attributes[:lname]
    fill_in 'user_email', with: attributes[:email]
    fill_in 'user_mobile', with: attributes[:mobile]
    find("input[type='submit']").click
  end
end
