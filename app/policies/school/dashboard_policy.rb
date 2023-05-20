# frozen_string_literal: true

module School
  class DashboardPolicy < BasePolicy
    def index?
      role_from?(:member)
    end

    def agreement?
      index?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept.includes(:user).includes(:team)
      end
    end
  end
end
