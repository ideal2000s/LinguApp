# frozen_string_literal: true

FactoryBot.define do
  factory :text_item, parent: :task_item, class: 'TaskItems::Text'
end
