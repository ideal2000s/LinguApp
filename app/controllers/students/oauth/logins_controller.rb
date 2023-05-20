# frozen_string_literal: true

module Students
  module OAuth
    class LoginsController < ApplicationController
      def show
        # render :show, locals: { application: application, team: team }
        application
        accept_response = ::HydraAuth::Login.accept_login(login_challenge: params[:login_challenge], resource: current_student)

        redirect_to accept_response&.redirect_to
      end

      def accept
        accept_response = ::HydraAuth::Login.accept_login(login_challenge: params[:login_challenge], resource: current_student)

        redirect_to accept_response&.redirect_to
      end

      def reject; end

      private

      def auth_login
        @auth_login ||= ::HydraAuth::Login.fetch_login(login_challenge: params[:login_challenge])
      end

      def auth_client
        auth_login.client
      end

      def auth_client_id
        auth_client.client_id
      end
    end
  end
end
