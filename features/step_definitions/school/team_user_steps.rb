# frozen_string_literal: true

And(/^the following team users:$/) do |table|
  @users =
    table.hashes.each_with_object({}) do |attributes, h|
      h["#{attributes[:fname].titleize} #{attributes[:lname].titleize}"] =
        User.where(password: SecureRandom.urlsafe_base64(7), team_ids: [@team.id]).create(attributes)
    end
end

When(/^I go to school team users page$/) do
  visit school_team_users_path
end

And(/^I create new team user with following and submit:$/) do |table|
  click_on I18n.t('school.teachers.list.add_teacher')
  click_on I18n.t('school.team_students.index.add_manually')
  attributes = table.hashes.first

  within '#new-teacher-modal' do
    fill_in 'team_user_user_attributes_fname', with: attributes[:fname]
    fill_in 'team_user_user_attributes_lname', with: attributes[:lname]
    fill_in 'team_user_user_attributes_email', with: attributes[:email]
    find("input[type='submit']").click
  end
end

And(/^I import team users from csv$/) do
  click_on I18n.t('school.teachers.list.add_teacher')
  click_on I18n.t('school.teachers.new.import_from')
  attach_file 'file', Rails.root.join('spec', 'fixtures', 'files', 'import_students.csv'), visible: false
  find('.modal-action button').click
end

And(/^I update team user "(.+)" with following and submit:$/) do |team_user, table|
  click_link team_user
  find('.edit-teacher-profile button').click
  attributes = table.hashes.first

  within '#edit-teacher-modal' do
    fill_in 'team_user_user_attributes_fname', with: attributes[:fname]
    fill_in 'team_user_user_attributes_lname', with: attributes[:lname]
    fill_in 'team_user_user_attributes_email', with: attributes[:email]
    find("input[type='submit']").click
  end
end

And(/^I check "(.*)" role filter and submit$/) do |role|
  click_on I18n.t('school.teachers.list.all_roles')
  find("label[for=#{role}_check]").click
  click_on I18n.t('.save')
end
