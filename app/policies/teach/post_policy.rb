# frozen_string_literal: true

module Teach
  class PostPolicy < BasePolicy
    def index?
      role_from?(:member)
    end

    def new?
      role_from?(:member)
    end

    def create?
      new?
    end

    def edit?
      return true if role_from?(:manager)

      record&.author == user
    end

    def update?
      edit?
    end

    def destroy?
      edit?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.create_with(author: user.user).where(team: Team.current).kept
      end
    end
  end
end
