# frozen_string_literal: true

module Students
  class OmniauthController < ApplicationController
    skip_before_action :authenticate_student!

    def create
      timezone = student_timezone
      result = ::Auth::Cases::StudentFromOmniauth.call(oauth_hash: auth_hash, timezone: timezone)

      return omniauth_success(result) if result.success?

      omniauth_failure(result)
    end

    protected

    def student_timezone
      return if Rails.env.development?

      Timezone.lookup(request.location.latitude, request.location.longitude).name
    end

    def auth_hash
      request.env['omniauth.auth']
    end

    def redirect_url
      url = stored_location_for(:student)
      url = root_path if url.blank? || url == '/'

      store_location_for(:student, nil)

      url
    end

    def storable_location?
      false
    end

    private

    def omniauth_failure(result)
      render('devise/registrations/new', locals: { resource: result.value[:student], resource_name: 'student' },
                                         layout: 'auth/index')
    end

    def omniauth_success(result)
      sign_in(:student, result.value[:student])
      render :create, layout: false, locals: {
        authenticity_token: form_authenticity_token,
        jwt_token: request.env['warden-jwt_auth.token'],
        student: result.value[:student]
      }
    end
  end
end
