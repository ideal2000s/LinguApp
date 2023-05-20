# frozen_string_literal: true

FactoryBot.define do
  factory :image_object_item, parent: :task_item, class: 'TaskItems::ImageObject' do
    instruction { '' }
  end
end
