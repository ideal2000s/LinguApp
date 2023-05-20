# frozen_string_literal: true

When(/^I go to school students page$/) do
  visit school_students_path
end

And(/^I create new student with following and submit:$/) do |table|
  find('span', text: I18n.t('school.team_students.form.add_new_student')).click
  find('span', text: I18n.t('school.team_students.index.add_manually')).click
  attributes = table.hashes.first
  native_language = @languages[attributes[:native_language]]
  target_language = @languages[attributes[:target_language]]

  within '#new-student-modal' do
    fill_in 'student_fname', with: attributes[:fname]
    fill_in 'student_lname', with: attributes[:lname]
    fill_in 'student_email', with: attributes[:email]
    find("select#student_student_support_languages_attributes_0_language_id option[value='#{native_language.id}']").click
    find("select#student_student_target_languages_attributes_0_language_id option[value='#{target_language.id}']").click
    select attributes[:level], from: 'student_student_target_languages_attributes_0_level'
    find("input[type='submit']").click
  end
end

And(/^I update student "(.+)" with following and submit:$/) do |full_name, table|
  click_on full_name
  find('.edit-student-profile button').click
  attributes = table.hashes.first

  find("input[data-language_scope='target']").click
  find("#suggestion_#{attributes[:target_language]}").click
  find("div[data-language_id='#{@languages[attributes[:target_language]].id}'] .active-status").click
  find("input[data-language_scope='support']").click
  find("#suggestion_#{attributes[:native_language]}").click
  find("div[data-language_id='#{@languages[attributes[:native_language]].id}'] .active-status").click
  within '#edit-student-modal' do
    fill_in 'student_fname', with: attributes[:fname]
    fill_in 'student_lname', with: attributes[:lname]
    fill_in 'student_email', with: attributes[:email]
    find("input[type='submit']").click
  end
end

And(/^Click the archive button of the student with email "(.+)"$/) do |email|
  accept_confirm do
    find('td', text: email).find(:xpath, '..').all('td').last.hover.find('.student-actions').all('button').last.click
  end
end

And(/^Click no license of the student and plan with "(.+)"$/) do |plan_name|
  find('.student-license .no-license-label').click
  find('.license-label', text: plan_name).click
end

And(/^Click the active license of the student$/) do
  find('.student-license .license-label').click
end

And(/^Click revoke license button and submit$/) do
  find('button.license-action-button').click
  within '#school-main-modal' do
    find("input[type='submit']").click
  end
end

And(/^I import students from csv file$/) do
  click_on I18n.t('school.team_students.form.add_new_student')
  click_on I18n.t('school.team_students.index.import_students')
  attach_file 'file', Rails.root.join('spec', 'fixtures', 'files', 'import_students.csv'), visible: false
  find('.modal-action button').click
end

And(/^I create new class with following and submit:$/) do |table|
  click_on I18n.t('school.team_students.index.new_class')
  attributes = table.hashes.first

  within '#team-group-modal' do
    fill_in 'team_group_name', with: attributes[:name]
    select attributes[:language], from: 'team_group_language_id'
    select attributes[:level], from: 'team_group_level'
    find("input[type='submit']").click
  end
end

And(/^I check target language code "(.*)" and submit$/) do |language_code|
  click_on I18n.t('shared.language')
  find("label[for=#{language_code}_check]").click
  click_on I18n.t('.save')
end

And(/^Click name sort and submit "(.*)"/) do |name|
  find('.selected-sort-item').click
  click_on name
end

Then(/^I should see the "(.*)" name under the "(.*)" name$/) do |under, above|
  expect(page.body.index(above)).to be < page.body.index(under)
end
