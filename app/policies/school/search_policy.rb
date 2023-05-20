# frozen_string_literal: true

module School
  class SearchPolicy < BasePolicy
    def index?
      role_from?(:member)
    end
  end
end
