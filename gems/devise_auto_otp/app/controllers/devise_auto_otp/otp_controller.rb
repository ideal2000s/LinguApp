# frozen_string_literal: true

module DeviseAutoOtp
  class OtpController < Devise::SessionsController
    include Devise::Controllers::Helpers
    prepend_before_action :require_no_authentication, except: %i[destroy]

    def new
      self.resource = resource_class.new(sign_in_params)
    end

    def email_otp
      self.resource = resource_class.new(sign_in_params)
    end

    def request_otp # rubocop:disable Metrics/AbcSize
      self.email_param = sign_in_params[:email]
      self.resource = resource_class.find_or_create_by(email: email_param)

      resource.lead = true if resource.respond_to?(:lead)
      render_new and return unless resource.valid?

      yield(resource) if block_given?

      resource.send_otp_instructions if resource.respond_to?(:send_otp_instructions)

      respond_to do |f|
        f.html { redirect_to verify_otp_path(resource) }
        f.json { head :created }
      end
    end

    def otp
      self.resource = resource_class.find_or_initialize_by(email: email_param)
      yield(resource) if block_given?
    end

    protected

    def email_param
      session.fetch("#{resource_name}_otp_email") do
        sign_in_params[:email]
      end
    end

    def email_param=(val)
      session["#{resource_name}_otp_email"] = val
    end

    def auth_options
      { scope: resource_name, recall: "#{controller_path}#otp" }
    end

    private

    def render_new
      respond_to do |f|
        f.html { render :new }
        f.json { head :unprocessable_entity }
      end
    end

    def sign_in_params
      devise_parameter_sanitizer.sanitize(:sign_in)
    end
  end
end
