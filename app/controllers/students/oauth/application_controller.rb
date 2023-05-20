# frozen_string_literal: true

module Students
  module OAuth
    class ApplicationController < ::Students::ApplicationController
      layout 'students/auth'

      private

      def auth_client_id
        raise NotImplementedError
      end

      def application
        @application ||= ::OAuth::App.find(auth_client_id)
      end

      def team
        application.team
      end
    end
  end
end
