# frozen_string_literal: true

FactoryBot.define do
  factory :inline_dropdown_item, parent: :task_item, class: 'TaskItems::InlineDropdown' do
    statement { '' }
  end
end
