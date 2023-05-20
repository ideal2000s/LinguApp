# frozen_string_literal: true

Given(/^these clients:$/) do |table|
  @clients = {}
  table.hashes.each do |client_attributes|
    client = create(:client, client_attributes)
    @clients[client_attributes['name']] = client
  end
end

And(/^there are (\d+) clients with (\d+) students in each$/) do |_arg1, _arg2|
  pending
end

Then(/^I can edit all clients$/) do
  pending
end

When(/^I submit new client form with the following data:$/) do |_table|
  # table is a table.hashes.keys # => [:name, :org_id, :billing info]
  pending
end

Then(/^I should be on admin clients page with success notice$/) do
  pending
end
