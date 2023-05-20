# frozen_string_literal: true

module School
  class AssignmentPolicy < BasePolicy
    def index?
      role_from?(:member)
    end

    def show?
      index?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.preload(:assignable).order(:status)
      end
    end
  end
end
