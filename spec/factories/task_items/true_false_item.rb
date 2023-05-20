# frozen_string_literal: true

FactoryBot.define do
  factory :true_false_item, parent: :task_item, class: 'TaskItems::TrueFalse' do
    statement { '' }
    veracity { true }
  end
end
