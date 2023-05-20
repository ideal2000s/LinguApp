# frozen_string_literal: true

module Workspace
  class StudentPolicy < WorkspacePolicy
    def index?
      return true if user.admin?
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
      index?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept
      end
    end
  end
end
