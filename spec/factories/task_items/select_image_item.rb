# frozen_string_literal: true

FactoryBot.define do
  factory :select_image_item, parent: :task_item, class: 'TaskItems::SelectImage' do
    question { '' }
  end
end
