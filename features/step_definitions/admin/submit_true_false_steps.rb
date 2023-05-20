# frozen_string_literal: true

When(%r{^I submit true/false task item form with "([^"]*)" statement as true$}) do |statement|
  within '.new_task_item' do
    fill_in 'task_item_statement', with: statement
    choose 'True', allow_label_click: true
    click_button 'Add statement'
  end
end

Then(/^I should see "([^"]*)" on the page with "([^"]*)" as correct answer$/) do |statement, answer|
  expect(page).to have_content(statement)
  within 'div', text: statement do
    expect(page).to have_content(answer.humanize)
  end
end
