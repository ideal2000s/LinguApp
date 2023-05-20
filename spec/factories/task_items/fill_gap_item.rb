# frozen_string_literal: true

FactoryBot.define do
  factory :fill_gap_item, parent: :task_item, class: 'TaskItems::FillGap' do
    statement { '' }
  end
end
