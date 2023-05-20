# frozen_string_literal: true

module Admin
  class PlanPolicy < ApplicationPolicy
    def index?
      return false unless user

      !user.basic?
    end

    def new?
      return false unless user

      user.admin?
    end

    def create?
      new?
    end

    def edit?
      new?
    end

    def update?
      new?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.all
      end
    end
  end
end
