# frozen_string_literal: true

module Teach
  class CoursePolicy < BasePolicy
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

    def show?
      record.team == team_user.team
    end

    def destroy?
      edit?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.friendly.create_with(author: user.user).by_team(Team.current).kept
      end
    end
  end
end
