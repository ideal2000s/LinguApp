# frozen_string_literal: true

FactoryBot.define do
  factory :mark_word_item, parent: :task_item, class: 'TaskItems::MarkWord' do
    statement { '' }
  end
end
