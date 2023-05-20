# frozen_string_literal: true

class NavigationPolicy < ApplicationPolicy
  attr_reader :record, :user

  def admin_dashboard?
    return false unless user

    !user.basic?
  end
end
