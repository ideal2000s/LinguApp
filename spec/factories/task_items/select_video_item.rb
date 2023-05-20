# frozen_string_literal: true

FactoryBot.define do
  factory :select_video_item, parent: :task_item, class: 'TaskItems::SelectVideo' do
    question { 'Video item question' }
  end
end
