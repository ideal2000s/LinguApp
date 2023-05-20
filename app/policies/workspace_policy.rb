# frozen_string_literal: true

class WorkspacePolicy < ApplicationPolicy
  attr_reader :record, :user

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end
end
