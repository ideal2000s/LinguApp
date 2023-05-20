# frozen_string_literal: true

FactoryBot.define do
  factory :email_task, traits: %i[task], class: 'Tasks::Email' do
    type { 'Tasks::Email' }
  end
end
