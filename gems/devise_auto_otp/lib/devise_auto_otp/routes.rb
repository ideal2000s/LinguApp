# frozen_string_literal: true

module DeviseAutoOtp
  module Routes
    protected

    def devise_otp(_mapping, _controllers)
      scope(module: :devise_auto_otp) do
        resource(:session, only: %i[], path: '', controller: :otp) do
          get(:new, path: 'sign_in', as: :new)
          get(:email_otp, path: 'email_otp')
          post(:request_otp, path: 'otp')
          get(:otp, path: 'otp')
          post(:create, path: 'sign_in')
          delete(:destroy, path: 'sign_out', as: :destroy)
        end
      end
    end
  end
end
