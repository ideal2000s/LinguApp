# frozen_string_literal: true

When(/^I fill in inline dropdown task item form with "([^"]*)"$/) do |statement|
  within 'form.new_task_item' do
    fill_in 'task_item_statement', with: statement
    click_button I18n.t('teach.task_items.inline_dropdown.forms.form.add_block')
  end
end
