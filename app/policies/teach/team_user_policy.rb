# frozen_string_literal: true

module Teach
  class TeamUserPolicy < BasePolicy
    def initialize(user, record) # rubocop:disable Lint/MissingSuper
      @user = user
      @team_user = record
      @record = record
    end

    def edit?
      return false if record.team.personal?

      role_from?(:member)
    end

    def update?
      edit?
    end

    def destroy?
      return false if user == record.user

      edit?
    end

    def leave?
      user == record.user
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept.includes(:user).includes(:team)
      end
    end
  end
end
