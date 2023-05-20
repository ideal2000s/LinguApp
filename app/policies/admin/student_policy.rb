# frozen_string_literal: true

module Admin
  class StudentPolicy < ApplicationPolicy
    def index?
      return false unless user

      !user.basic?
    end

    def show?
      index?
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
      edit?
    end

    def destroy?
      user.admin?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept
             .includes(:native_language)
             .by_language(user.language_scope)
             .order(created_at: :desc)
      end
    end
  end
end
