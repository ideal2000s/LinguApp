# frozen_string_literal: true

require 'devise/strategies/database_authenticatable'
module Devise
  module Strategies
    class OtpAuthenticatable < Devise::Strategies::DatabaseAuthenticatable
      # def authenticate!
      #   resource = mapping.to.find_for_database_authentication(authentication_hash)
      #   # We check the OTP
      #   if validate(resource) { validate_otp(resource) }
      #     remember_me(resource)
      #     success!(resource)
      #   end
      #
      #   unless resource
      #     Devise.paranoid ? fail(:invalid) : fail(:not_found_in_database)
      #   end
      #
      #   # # We want to cascade to the next strategy if this one fails,
      #   # # but database authenticatable automatically halts on a bad password
      #   # @halted = false if @result == :failure
      # end
      #
      # def valid?
      #   valid_for_params_auth? || valid_for_http_auth?
      # end
      #
      # def validate_otp(resource)
      #   return if params[scope][:password].nil?
      #
      #   resource.valid_password?(params[scope][:password])
      # end
    end
  end
end
