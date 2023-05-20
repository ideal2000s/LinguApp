# frozen_string_literal: true

module Teach
  class TeamDomainPolicy < ApplicationPolicy
    def create?
      return true if user.admin?

      false
    end

    def destroy?
      create?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept.includes(:user).includes(:team)
      end
    end
  end
end
