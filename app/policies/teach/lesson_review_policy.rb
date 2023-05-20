# frozen_string_literal: true

module Teach
  class LessonReviewPolicy < BasePolicy
    def index?
      true
    end

    def create?
      return false if record.lesson.author == user

      role_from?(:member)
    end

    def destroy?
      return false if user == record.lesson.author

      user == record.author
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.all
      end
    end
  end
end
