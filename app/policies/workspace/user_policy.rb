# frozen_string_literal: true

module Workspace
  class UserPolicy < WorkspacePolicy
    def index?
      user.admin?
    end

    def show?
      index?
    end

    def edit?
      show?
    end

    def update?
      show?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope
          .kept
          .active
      end
    end
  end
end
