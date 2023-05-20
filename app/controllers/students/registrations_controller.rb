# frozen_string_literal: true

module Students
  class RegistrationsController < Devise::RegistrationsController
    before_action :configure_sign_up_params, if: :devise_controller?

    protected

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: %i[fname lname])
    end
  end
end
