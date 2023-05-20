# frozen_string_literal: true

When 'I preview the teach video task' do
  within '.card-header' do
    find('a i.fa-eye').click
  end
end

Then 'I should see teach video task preview' do
  expect(page).to have_content(@tasks.values.last.name)
end

And(/^the following items in task "([^"]*)":$/) do |task_name, table|
  @items = @tasks[task_name].items.create(table.hashes)
end

Then(/^I expect to see video task url in the input field (.+)$/) do |input|
  step "I should see \"#{@data_url}\" in the input field #{input}"
end

When(/^I add video task item with "(.+)"$/) do |url|
  @data_url = url
  within 'form.edit_task_item' do
    fill_in I18n.t('teach.tasks.video.form.url.label'), with: url
    click_button I18n.t('save_changes')
  end
end
