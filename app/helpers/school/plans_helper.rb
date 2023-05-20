# frozen_string_literal: true

module School
  module PlansHelper
    def plan_price(plan)
      m = plan.price
      price = m.format(symbol: "#{m.currency} ")

      interval = t(plan.plan_interval.presence,
                   scope: 'activerecord.attributes.plan.plan_intervals')

      t('school.team_students.profile.plan_price', price: price, interval: interval)
    end
  end
end
