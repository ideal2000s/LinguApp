# frozen_string_literal: true

module School
  class CoursePolicy < BasePolicy
    def index?
      role_from?(:member)
    end

    def show?
      index?
    end

    def assign_team_group?
      index?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept
             .includes(:language)
             .order(created_at: :desc)
      end
    end
  end
end
