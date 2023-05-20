# frozen_string_literal: true

module Admin
  class NavigationPolicy
    def initialize(current_user, _record = nil)
      self.user = current_user
    end

    def users?
      user&.admin?
    end

    def settings?
      user&.admin?
    end

    private

    attr_accessor :user
  end
end
