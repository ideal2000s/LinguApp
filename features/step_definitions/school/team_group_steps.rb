# frozen_string_literal: true

And(/^the following team groups:$/) do |table|
  @team_groups =
    table.hashes.each_with_object({}) do |attributes, h|
      h[(attributes[:name]).to_s] = create(:team_group, attributes.merge(language: @languages.values[0],
                                                                         team: @team,
                                                                         level: 'a1'))
    end
end

When(/^I go to school team groups page$/) do
  visit school_team_groups_path
end
