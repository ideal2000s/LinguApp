# frozen_string_literal: true

module DeviseAutoOtp
  module Controllers
    module UrlHelpers
      def sign_in_otp_path(resource_or_scope, opts = {})
        scope = Devise::Mapping.find_scope!(resource_or_scope)
        send("new_#{scope}_session_path", opts)
      end
      alias new_session_path sign_in_otp_path

      def email_otp_path(resource_or_scope, opts = {})
        scope = Devise::Mapping.find_scope!(resource_or_scope)
        send("email_otp_#{scope}_session_path", opts)
      end

      def request_otp_path(resource_or_scope, opts = {})
        scope = Devise::Mapping.find_scope!(resource_or_scope)
        send("request_otp_#{scope}_session_path", opts)
      end

      def verify_otp_path(resource_or_scope, opts = {})
        scope = Devise::Mapping.find_scope!(resource_or_scope)
        send("request_otp_#{scope}_session_path", opts)
      end

      def sign_out_otp_path(resource_or_scope, opts = {})
        scope = Devise::Mapping.find_scope!(resource_or_scope)
        send("destroy_#{scope}_session_path", opts)
      end
    end
  end
end
