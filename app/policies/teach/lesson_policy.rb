# frozen_string_literal: true

module Teach
  class LessonPolicy < BasePolicy
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

    def update?
      edit?
    end

    def show?
      index?
    end

    def destroy?
      return false if record.published?
      return true if role_from?(:manager)

      record&.author == user
    end

    def destroy_batch?
      destroy?
    end

    def reviewable?
      index?
    end

    def approved?
      index?
    end

    def published?
      index?
    end

    def draft?
      index?
    end

    def pending?
      index?
    end

    def publish?
      edit? && record.approved?
    end

    def unpublish?
      edit? && record.published?
    end

    def review?
      edit?
    end

    def status?
      edit?
    end

    def to_approved?
      user.admin?
    end

    def add_objective?
      edit?
    end

    def remove_objective?
      edit?
    end

    def split?
      edit?
    end

    def move_tasks?
      edit?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.create_with(author: user.user).by_team(Team.current).kept.order(:title)
      end
    end
  end
end
