# frozen_string_literal: true

module Admin
  class TeamPolicy < ApplicationPolicy
    def index?
      return false unless user

      !user.basic?
    end

    def new?
      index?
    end

    def create?
      index?
    end

    def edit?
      index?
    end

    def update?
      index?
    end

    def destroy?
      false
    end

    def show?
      index?
    end

    def signin_school?
      show? && record.school?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept
      end
    end
  end
end
