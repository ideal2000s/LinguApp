# frozen_string_literal: true

FactoryBot.define do
  sequence :random_subject do |n|
    "#{Faker::Educator.subject}##{n}"
  end
end
