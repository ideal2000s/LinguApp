# frozen_string_literal: true

module School
  class UserPolicy < BasePolicy
    def edit?
      role_from?(:member)
    end

    def update?
      edit?
    end
  end
end
