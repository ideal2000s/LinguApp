# frozen_string_literal: true

FactoryBot.define do
  factory :dictation_item, parent: :task_item, class: 'TaskItems::Dictation' do
    sentence { '' }
  end
end
