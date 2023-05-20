# frozen_string_literal: true

FactoryBot.define do
  factory :audition_item, parent: :task_item, class: 'TaskItems::Audition' do
    start { 0 }
  end
end
