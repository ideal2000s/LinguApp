# frozen_string_literal: true

module Students
  module API
    module PerPage
      private

      def per_page
        per_page = params[:per_page].presence.to_i
        return per_page if (1..50).cover?(per_page)

        25
      end
    end
  end
end
