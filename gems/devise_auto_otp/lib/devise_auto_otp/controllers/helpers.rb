# frozen_string_literal: true

module DeviseAutoOtp
  module Controllers
    module Helpers
      def authenticate_scope!
        send(:"authenticate_#{resource_name}!", force: true)
        self.resource = send("current_#{resource_name}")
      end

      #
      # Sanity check for resource validity
      #
      def ensure_resource!
        raise ArgumentError, 'Should not happen' if resource.nil?
      end
    end
  end
end
