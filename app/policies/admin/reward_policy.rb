# frozen_string_literal: true

module Admin
  class RewardPolicy < ApplicationPolicy
    def index?
      return false unless user

      !user.basic?
    end

    def create?
      index?
    end

    def new?
      index?
    end

    def edit?
      index?
    end

    def update?
      index?
    end

    def show?
      index?
    end

    def destroy?
      index?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept.includes(:language).by_language(user.language_scope).order(updated_at: :desc)
      end
    end
  end
end
