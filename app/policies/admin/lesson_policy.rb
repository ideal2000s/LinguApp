# frozen_string_literal: true

module Admin
  class LessonPolicy < ApplicationPolicy
    def index?
      return false unless user

      !user.basic?
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

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept
             .includes(:language)
             .by_language(user.language_scope)
             .order(updated_at: :desc)
      end
    end
  end
end
