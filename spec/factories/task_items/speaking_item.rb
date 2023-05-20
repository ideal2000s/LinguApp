# frozen_string_literal: true

FactoryBot.define do
  factory :speaking_item, parent: :task_item, class: 'TaskItems::Speaking' do
    sentence { '' }
  end
end
