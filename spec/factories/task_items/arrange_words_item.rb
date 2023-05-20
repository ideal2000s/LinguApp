# frozen_string_literal: true

FactoryBot.define do
  factory :arrange_words_item, parent: :task_item, class: 'TaskItems::ArrangeWords' do
    arrange_words { '' }
    additional_words { '' }
  end
end
