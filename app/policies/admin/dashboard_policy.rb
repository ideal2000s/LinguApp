# frozen_string_literal: true

module Admin
  class DashboardPolicy
    def initialize(current_user, _record = nil)
      self.user = current_user
    end

    def index?
      user.read_attribute_before_type_cast(:role).positive?
    end

    private

    attr_accessor :user
  end
end
