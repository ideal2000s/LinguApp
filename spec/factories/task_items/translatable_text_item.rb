# frozen_string_literal: true

FactoryBot.define do
  factory :translatable_text_item, parent: :task_item, class: 'TaskItems::TranslatableText'
end
