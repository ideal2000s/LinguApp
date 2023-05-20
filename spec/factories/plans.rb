# frozen_string_literal: true

# == Schema Information
#
# Table name: plans
#
#  id                :bigint           not null, primary key
#  language_id       :bigint           not null
#  system_name       :string
#  name_translations :jsonb            not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  price_cents       :integer          not null
#  price_currency    :string           not null
#  plan_interval     :integer          not null
#
FactoryBot.define do
  factory :plan do
    sequence(:name) { |n| "name_#{n}" }
    language { Language.find(ActiveRecord::FixtureSet.identify(:english)) }
    price { 5.0 }
    price_currency { 'EUR' }
    plan_interval { 'month' }
  end
end
