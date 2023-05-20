# frozen_string_literal: true

module Students::API
  class ApplicationController < ActionController::API
    include Students::StudentHelpers
    include Pundit

    UnsupportedFormat = Class.new(StandardError)

    rescue_from UnsupportedFormat do |e|
      render json: { errors: [e.message] }, status: :bad_request
    end
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from ActionController::ParameterMissing do |e|
      render json: { errors: [e.message] }, status: :bad_request
    end
    rescue_from Pundit::NotAuthorizedError, with: -> { head :forbidden }

    before_action :ensure_json_format!
    before_action :authenticate_student!
    before_action do
      Student.current = current_student
    end

    respond_to :json

    private

    def pundit_user
      current_student
    end

    def ensure_json_format!
      raise(UnsupportedFormat, 'unsupported format') unless request.format == :json
    end

    def not_found
      head :not_found
    end

    def authenticate_student!
      head :unauthorized unless student_signed_in?
    end
  end
end
