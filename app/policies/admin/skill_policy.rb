# frozen_string_literal: true

module Admin
  class SkillPolicy < ApplicationPolicy
    def index?
      return false unless user

      user.admin?
    end

    def create?
      index?
    end

    def show?
      index?
    end

    def update?
      index?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.all
      end
    end
  end
end
