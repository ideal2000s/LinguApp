# frozen_string_literal: true

module HydraAuth
  class Consent < Wrapper
    FETCH_CONSENT_PATH  = 'oauth2/auth/requests/consent'
    ACCEPT_CONSENT_PATH = 'oauth2/auth/requests/consent/accept'

    def initialize(scope: %w[openid offline_access], **args)
      self.scope = scope

      super
    end

    class << self
      def fetch_consent(**args)
        new.fetch_consent(**args)
      end

      def accept_consent(resource:, scope:, **args)
        new(resource: resource, scope: scope).accept_consent(**args)
      end
    end

    def fetch_consent(consent_challenge:)
      get(FETCH_CONSENT_PATH, consent_challenge: consent_challenge).body
    end

    def accept_consent(consent_challenge:)
      put(ACCEPT_CONSENT_PATH) do |req|
        req.params[:consent_challenge] = consent_challenge
        req.body                       = accept_consent_body
      end.body
    end

    private

    attr_accessor :scope

    def accept_consent_body
      {
        grant_scope: scope,
        session: session_data
      }
    end

    def session_data
      {
        id_token: id_token_data
      }
    end

    def id_token_data
      {}.tap do |hash|
        hash[:profile] = profile_data(resource) if scope.include?('profile')
      end
    end

    def profile_data(resource)
      {
        id: resource.id,
        email: resource.email,
        first_name: resource.fname,
        last_name: resource.lname,
        name: resource.full_name,
        image: resource.avatar_url
      }
    end
  end
end
