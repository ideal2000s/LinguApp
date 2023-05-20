# frozen_string_literal: true

class UserRoleConstraint
  attr_accessor :roles

  def initialize(*roles)
    self.roles = roles
  end

  def matches?(request)
    user = request.env['warden'].user(:user)
    return unless user

    roles.any? { |role| role_from?(user, role) }
  end

  private

  def role_number(user)
    user.class.roles.fetch(user&.role, -1)
  end

  def role_from?(user, role)
    role_number(user) >= user.class.roles[role]
  end
end
