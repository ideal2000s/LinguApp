# frozen_string_literal: true

module Gameplays
  class FinishForm < ::ApplicationForm
    attribute :time_spent, Integer
    attribute :attempts, Integer
    attribute :xp_earned, Integer
    attribute :completed_at, DateTime, default: ->(_form, _attr) { Time.zone.now }

    validates :time_spent, :attempts, :xp_earned, presence: true
    validates :time_spent, :attempts, :xp_earned, numericality: { greater_than_or_equal_to: 0 }
  end
end
