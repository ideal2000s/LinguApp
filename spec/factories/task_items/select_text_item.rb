# frozen_string_literal: true

FactoryBot.define do
  factory :select_text_item, parent: :task_item, class: 'TaskItems::SelectText' do
    single_choice { true }
  end
end
