# frozen_string_literal: true

FactoryBot.define do
  factory :fill_in_table_item, parent: :task_item, class: 'TaskItems::FillInTable' do
    question { '' }
  end
end
