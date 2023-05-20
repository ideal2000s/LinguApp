# frozen_string_literal: true

module Students
  class ApplicationController < ::ApplicationController
    include StudentHelpers

    before_action :store_student_location!, if: :storable_location?
    before_action :authenticate_student!

    # prepend_view_path 'students'
    layout 'students/application'

    private

    # Its important that the location is NOT stored if:
    # - The request method is not GET (non idempotent)
    # - The request is handled by a Devise controller such as Devise::SessionsController as that could cause an
    #    infinite redirect loop.
    # - The request is an Ajax request as this can lead to very unexpected behaviour.
    def storable_location?
      request.get? && is_navigational_format? && !devise_controller? && !request.xhr?
    end

    def store_student_location!
      # :student is the scope we are authenticating
      store_location_for(:student, request.fullpath) unless signed_in?(:student)
    end
  end
end
