# frozen_string_literal: true

When(/^I submit audio dialogue item form with the following data:$/) do |table|
  data = table.hashes.first.symbolize_keys
  within 'form.new_task_item' do
    fill_in 'task_item_partner_name', with: data[:partner_name]
    attach_file 'task_item_audio',
                Rails.root.join('spec', 'fixtures', 'files', data[:audio_file]),
                visible: false
    click_button 'Save changes'
  end
end

And(/^we have the following audio items:$/) do |table|
  table.hashes.each do |attr|
    item = @tasks.values.last.items.new
    item.audio.attach(io: File.open(audio_fixture_file), filename: attr[:audio_file])
    item.save
  end
end

def audio_fixture_file
  Rails.root.join('spec', 'fixtures', 'files', 'audio.mp3')
end

When(/^I move "([^"]*)" item up$/) do |item|
  within('div.card', text: item) do
    click_link 'Move up'
  end
end

Then(/^item "([^"]*)" becomes the first$/) do |item|
  within '#task_items' do
    within 'div.card', match: :first do
      expect(page).to have_content(item)
    end
  end
end
