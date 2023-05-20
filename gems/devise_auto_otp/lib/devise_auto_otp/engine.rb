# frozen_string_literal: true

module DeviseAutoOtp
  class Engine < ::Rails::Engine
    ActiveSupport.on_load(:action_controller) do
      include DeviseAutoOtp::Controllers::UrlHelpers
      include DeviseAutoOtp::Controllers::Helpers
    end
    ActiveSupport.on_load(:action_view) do
      include DeviseAutoOtp::Controllers::UrlHelpers
      include DeviseAutoOtp::Controllers::Helpers
    end

    # We use to_prepare instead of after_initialize here because Devise is a Rails engine;
    config.to_prepare do
      ActionDispatch::Routing::Mapper.include(DeviseAutoOtp::Routes)
      Warden::Strategies.add(:otp_authenticatable, Devise::Strategies::OtpAuthenticatable)
    end
  end
end
