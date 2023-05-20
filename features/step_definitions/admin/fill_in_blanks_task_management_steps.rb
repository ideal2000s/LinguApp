# frozen_string_literal: true

When(/^I fill in fill in blanks task item form with "([^"]*)"$/) do |question|
  within 'form.new_task_item' do
    fill_in 'task_item_question', with: question
    click_button I18n.t('save')
  end
end
