# frozen_string_literal: true

module School
  class OAuthAppPolicy < BasePolicy
    def create?
      role_from?(:member)
    end

    def update?
      create?
    end

    def destroy?
      create?
    end

    def refresh_secret?
      create?
    end
  end
end
