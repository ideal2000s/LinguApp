# frozen_string_literal: true

module Students::API
  class SessionsController < DeviseAutoOtp::OtpController
    skip_forgery_protection
    respond_to :json

    def create
      super do |resource|
        update_timezone(resource)
        render(:create, locals: { student: resource, authenticity_token: form_authenticity_token }) and return
      end
    end

    private

    def update_timezone(resource)
      return if Rails.env.development?

      resource.update(time_zone: Timezone.lookup(request.location.latitude, request.location.longitude).name)
    end

    def respond_to_on_destroy
      respond_to do |format|
        format.all { head :no_content }
        format.json do
          render json: { success: true, authenticity_token: form_authenticity_token } and return
        end
        format.any(*navigational_formats) { redirect_to after_sign_out_path_for(resource_name) }
      end
    end
  end
end
