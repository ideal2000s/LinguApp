# frozen_string_literal: true

module Levelize
  extend ActiveSupport::Concern
  included do
    enum level: { undefined: 0, zero_level: 1, a1: 10, a2: 20, b1: 30, b2: 40, c1: 50, c2: 60 }

    def self.levels_for_filter
      levels.map do |k, v|
        [I18n.t(k, scope: 'activerecord.attributes.lesson.levels'), v]
      end
    end

    def self.levels_for_select
      levels.map do |k, _v|
        [I18n.t(k, scope: 'activerecord.attributes.lesson.levels'), k]
      end
    end

    def self.levels_for_target_language
      levels.without('undefined', 'c2').map do |k, _v|
        [I18n.t(k, scope: 'activerecord.attributes.lesson.levels'), k]
      end
    end

    def self.short_levels_select
      levels.without('undefined', 'c2').map do |k, _v|
        [I18n.t(k, scope: 'activerecord.attributes.lesson.short_levels'), k]
      end
    end
  end
end
