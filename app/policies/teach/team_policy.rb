# frozen_string_literal: true

module Teach
  class TeamPolicy < BasePolicy
    def initialize(user, record) # rubocop:disable Lint/MissingSuper
      @user = user
      @team_user = user.team_users.find_by(team: record)
      @record = record
    end

    def index?
      user.present?
    end

    def new?
      user.present?
    end

    def create?
      new?
    end

    def show?
      return false if record.personal?

      user.teams.include?(record)
    end

    def followers?
      show?
    end

    def edit?
      return false unless user
      return true if user.admin?

      role_from?(:owner)
    end

    def update?
      edit?
    end

    def destroy?
      edit?
    end

    def default?
      return false unless user

      user.teams.include?(record)
    end

    def instruction?
      user.present?
    end

    def instruction_post?
      user.present?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept
      end
    end
  end
end
