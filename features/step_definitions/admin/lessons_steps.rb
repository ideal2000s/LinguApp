# frozen_string_literal: true

Given 'the following lessons:' do |table|
  @lessons = []

  table.hashes.each do |attributes|
    language = @languages[attributes.delete('language').to_s]

    @lessons << Lesson.create!(
      attributes.merge(
        author: @current_user,
        language: language,
        team: @team
      )
    )
  end
end

Given(/^I have a "(.+)" lesson$/) do |title|
  @lesson = Lesson.create!(
    title: title,
    author: @current_user,
    language: @languages.values.sample,
    team: @team
  )
end

Given(/^I have a "(.+)" lesson in a "(.+)" team$/) do |lesson_title, team_name|
  result = Teams::Cases::Create.call(user: @current_user, params: { name: team_name })
  @lesson = Lesson.create!(
    team: result.value[:team],
    title: lesson_title,
    author: @current_user,
    language: @languages.values.sample
  )
end

When 'I fill in new lesson form with following data:' do |table|
  @lesson_attributes = attributes = table.hashes.first
  fill_in 'Title', with: attributes['title']
  select attributes['language'], from: I18n.t('teach.lessons.form.select_target_language')
  click_button I18n.t('save')
end

Then(/^I can see lesson title "(.+)"$/) do |string|
  # TODO: use more specific selector
  expect(page).to have_content(string)
end

Then(/^I can see task title "(.+)"$/) do |string|
  expect(page).to have_content(string)
end

Then 'I should be on teach lessons page' do
  within '.content > h1' do
    if @current_user.admin?
      expect(page).to have_content(I18n.t('teach.lessons.index.all_lessons'))
    else
      expect(page).to have_content(I18n.t('teach.lessons.index.my_lessons'))
    end
  end
end

Then(/^I should be on teach lesson page$/) do
  expect(page).to have_selector('h1', text: @lesson_attributes['title'])
end
