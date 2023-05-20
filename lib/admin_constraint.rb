# frozen_string_literal: true

class AdminConstraint
  ADMIN_SUBDOMAIN_REGEX = /^(www\.)?admin/.freeze

  def matches?(request)
    return unless request.subdomain =~ ADMIN_SUBDOMAIN_REGEX

    user = request.env['warden'].user(:user)
    return unless user

    !user.basic?
  end
end
