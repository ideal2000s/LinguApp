# frozen_string_literal: true

module Students
  module OAuth
    class ConsentsController < ApplicationController
      def show
        render :show, locals: {
          application: application,
          team: team,
          scope: auth_consent.requested_scope
        }
      end

      def accept
        accept_response = ::HydraAuth::Consent.accept_consent(consent_challenge: params[:consent_challenge],
                                                              resource: current_student,
                                                              scope: auth_consent.requested_scope)

        redirect_to accept_response&.redirect_to
      end

      def reject; end

      private

      def auth_consent
        @auth_consent ||= ::HydraAuth::Consent.fetch_consent(consent_challenge: params[:consent_challenge])
      end

      def auth_client
        auth_consent.client
      end

      def auth_client_id
        auth_client.client_id
      end
    end
  end
end
