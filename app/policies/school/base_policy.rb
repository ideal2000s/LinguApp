# frozen_string_literal: true

module School
  class BasePolicy < ApplicationPolicy
    def initialize(team_user, record) # rubocop:disable Lint/MissingSuper
      @team_user = team_user
      @user = team_user&.user
      @record = record
    end

    attr_reader :team_user

    private

    def role_number
      TeamUser.roles.fetch(team_user&.role, -1)
    end

    def role_from?(role)
      role_number >= TeamUser.roles[role]
    end
  end
end
