# frozen_string_literal: true

And(/^the following documents:$/) do |table|
  @documents = table.hashes.each_with_object({}) do |attributes, hash|
    hash[attributes[:content]] = Document.create!(attributes.merge(assignable: @tasks.values.first,
                                                                   student: @students.values.first, team: @team))
  end
end

When(/^I go to school assignments page$/) do
  visit school_documents_path
end

And(/^I click the document from student$/) do
  find("tr#document_#{@documents.values.sample.id}").click
end

And(/^I click the document response textarea and submit with following comment$/) do |table|
  find('.document-response-input').click
  table.hashes.each do |attribute|
    find('.school-response').find('.note-editable').set(attribute[:comment])
  end
  find('.school-response-submit').click
end
