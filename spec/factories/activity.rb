# frozen_string_literal: true

FactoryBot.define do
  factory :activity do
    association :trackable, factory: :license
  end
end
