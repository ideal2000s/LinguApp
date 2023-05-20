# frozen_string_literal: true

module Admin
  class SearchPolicy < ApplicationPolicy
    def index?
      user.admin?
    end
  end
end
