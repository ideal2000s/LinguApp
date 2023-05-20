# frozen_string_literal: true

module School
  class TeamPolicy < BasePolicy
    def edit?
      role_from?(:member)
    end

    def update?
      edit?
    end
  end
end
