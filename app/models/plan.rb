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
class Plan < ApplicationRecord
  CURRENCIES = %w[USD EUR NOK].freeze
  translates :name

  has_many :licenses, dependent: :destroy
  has_many :team_students, through: :licenses

  belongs_to :language

  monetize :price_cents, numericality: { greater_than_or_equal_to: 0 }
  enum plan_interval: { week: 0, month: 1, quarter: 2, year: 3 }

  validates :language, presence: true
  validates :name, presence: true
  validates :price_currency, inclusion: { in: CURRENCIES }
  validates :plan_interval, presence: true

  def self.price_currencies_for_select
    CURRENCIES.map do |k|
      [k, k]
    end
  end

  def self.plan_intervals_for_select
    plan_intervals.map do |k, _v|
      [I18n.t(k, scope: 'activerecord.attributes.plan.plan_intervals'), k]
    end
  end
end
