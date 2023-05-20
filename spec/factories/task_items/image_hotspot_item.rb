# frozen_string_literal: true

FactoryBot.define do
  factory :image_hotspot_item, parent: :task_item, class: 'TaskItems::ImageHotspot' do
    word { '' }
  end
end
