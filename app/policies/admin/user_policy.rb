# frozen_string_literal: true

module Admin
  class UserPolicy < ApplicationPolicy
    def index?
      return false unless user

      !user.basic?
    end

    def edit?
      index?
    end

    def update?
      index?
    end

    def destroy?
      user.admin?
    end

    def new?
      index?
    end

    def create?
      index?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept.order(created_at: :desc)
      end
    end
  end
end
