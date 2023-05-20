# frozen_string_literal: true

module HydraAuth
  class Login < Wrapper
    FETCH_LOGIN_PATH    = 'oauth2/auth/requests/login'
    ACCEPT_LOGIN_PATH   = 'oauth2/auth/requests/login/accept'

    class << self
      def fetch_login(**args)
        new.fetch_login(**args)
      end

      def accept_login(resource:, **args)
        new(resource: resource).accept_login(**args)
      end
    end

    def fetch_login(login_challenge:)
      get(FETCH_LOGIN_PATH, login_challenge: login_challenge).body
    end

    def accept_login(login_challenge:)
      put(ACCEPT_LOGIN_PATH) do |req|
        req.params[:login_challenge] = login_challenge
        req.body                     = accept_login_body
      end.body
    end

    private

    def accept_login_body
      {
        subject: resource.id.to_s,
        remember: true,
        remember_for: 3600
      }
    end
  end
end
