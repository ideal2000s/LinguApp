# frozen_string_literal: true

FactoryBot.define do
  factory :essay_item, parent: :task_item, class: 'TaskItems::Essay' do
    minimum_words { 3 }
  end
end
