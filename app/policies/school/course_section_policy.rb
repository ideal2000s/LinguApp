# frozen_string_literal: true

module School
  class CourseSectionPolicy < BasePolicy
    def show?
      role_from?(:member)
    end

    def change_view_mode?
      show?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.includes(:lessons)
             .order(created_at: :desc)
      end
    end
  end
end
