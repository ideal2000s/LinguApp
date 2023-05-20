# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    user.active?
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      scope.kept.active
    end
  end
end
