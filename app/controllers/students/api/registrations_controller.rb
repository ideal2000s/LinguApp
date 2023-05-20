# frozen_string_literal: true

module Students::API
  class RegistrationsController < Devise::RegistrationsController
    skip_forgery_protection
    before_action :configure_sign_up_params, if: :devise_controller?

    respond_to :json

    protected

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: %i[fname lname])
    end
  end
end
