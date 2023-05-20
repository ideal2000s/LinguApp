# frozen_string_literal: true

require 'devise_auto_otp/version'

require 'active_support/core_ext/integer'
require 'active_support/core_ext/string'
require 'active_support/ordered_hash'
require 'active_support/concern'

require 'devise'

module Devise
  mattr_accessor :otp_authentication_timeout, default: 15.minutes
end

module DeviseAutoOtp
  autoload :Mailer, 'devise_auto_otp/mailer'
  autoload :Mapping, 'devise_auto_otp/mapping'
  module Controllers
    autoload :Helpers, 'devise_auto_otp/controllers/helpers'
    autoload :UrlHelpers, 'devise_auto_otp/controllers/url_helpers'
  end

  module Models
    autoload :OtpAuthenticatable, 'devise_auto_otp/models/otp_authenticatable'
  end
end

require 'devise_auto_otp/routes'
require 'devise/strategies/otp_authenticatable'
require 'devise_auto_otp/engine'

Devise.add_module(:otp_authenticatable,
                  controller: :otp,
                  model: true,
                  route: :otp,
                  strategy: true)
