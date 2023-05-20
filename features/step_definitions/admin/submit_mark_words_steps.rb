# frozen_string_literal: true

When(/^I submit mark word task item form with "([^"]+)" statement$/) do |statement|
  within 'form.new_task_item' do
    fill_in 'task_item_statement', with: statement
    click_button 'Add statement'
  end
end
