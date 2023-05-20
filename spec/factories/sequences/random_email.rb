# frozen_string_literal: true

FactoryBot.define do
  sequence :random_email do |n|
    Faker::Internet.email.split('@').insert(1, n).join('@')
  end
end
