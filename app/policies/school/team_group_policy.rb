# frozen_string_literal: true

module School
  class TeamGroupPolicy < BasePolicy
    def assign_team_group?
      role_from?(:member)
    end

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
      new?
    end

    def archive?
      edit?
    end

    def update?
      edit?
    end

    def destroy?
      edit?
    end

    def edit_plan?
      edit?
    end

    def update_plan?
      edit?
    end

    def assign_course?
      edit?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept
             .unarchived
             .includes(:team)
             .order(created_at: :desc)
      end
    end
  end
end
