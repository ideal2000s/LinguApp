# frozen_string_literal: true

And(/^Click school settings button$/) do
  RSpec::Mocks.with_temporary_scope do
    allow(Geocoder).to receive(:search).and_return([])
    find(".school-nav-bottom a[href='/current_team/edit']").click
  end
end

And(/^Click school billing tab$/) do
  find("#school-main-modal a[href='#billing-panel']").click
end

And(/^Fill in the general form with following and submit:$/) do |table|
  attributes = table.hashes.first

  within '#school-main-modal' do
    fill_in 'name', with: attributes[:name]
    select attributes[:language], from: 'default_language_id'
    find("input[type='submit']").click
  end
end

And(/^Fill in the billing form with following and submit:$/) do |table|
  attributes = table.hashes.first

  within '#school-main-modal' do
    fill_in 'business_registration_id', with: attributes[:business_registration_id]
    fill_in 'street_address', with: attributes[:street_address]
    fill_in 'city', with: attributes[:city]
    fill_in 'postal_code', with: attributes[:postal_code]
    find("input[type='submit']").click
  end
end
