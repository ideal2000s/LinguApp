# frozen_string_literal: true

Given 'the following lesson reviews:' do |table|
  @comments = []

  table.hashes.each do |attributes|
    fname, lname = attributes.delete('author').split
    author = create(:user, fname: fname, lname: lname)
    @comments << @lesson.reviews.create!(attributes.merge(author: author))
  end
end

When 'I go to the lesson reviews page' do
  visit teach_lesson_reviews_path(@lesson)
end

When 'I go to the lesson review page' do
  visit review_teach_lesson_path(@lesson)
end

Then 'I should see lesson tasks preview' do
  expect(page).to have_content(@lesson.title)

  @lesson.tasks.each do |task|
    expect(page).to have_content(task.name)
  end
end

Then 'I should see lesson reviews' do
  @lesson.reviews.each do |review|
    expect(page).to have_content(review.content)
    expect(page).to have_content(review.author_name)
  end
end

When(/^I post lesson review as "(.+)" with "(.+)" status$/) do |text, status|
  click_on I18n.t('teach.reviews.navbar.post_review')
  find_field('review[content]', visible: false)
    .sibling('.note-editor')
    .find('.note-editable[contenteditable=true]')
    .set(text)
  find("label[for=#{status}]").click
  click_button I18n.t('teach.reviews.form.submit_review')
end

Then(/I should see "(.+)" in reviews list/) do |content|
  within '#review__items' do
    expect(page).to have_content(content)
  end
end
