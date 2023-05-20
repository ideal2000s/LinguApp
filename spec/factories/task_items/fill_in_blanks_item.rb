# frozen_string_literal: true

FactoryBot.define do
  factory :fill_in_blanks_item, parent: :task_item, class: 'TaskItems::FillInBlanks' do
    question { '' }
  end
end
