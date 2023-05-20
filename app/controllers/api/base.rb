# frozen_string_literal: true

require 'grape-swagger'

module API
  class Base < Grape::API
    rescue_from Grape::Exceptions::ValidationErrors do |e|
      error!(e, :unprocessable_entity)
    end

    rescue_from ActiveRecord::RecordNotFound do
      error!('record not found', :not_found)
    end

    rescue_from ActiveRecord::RecordInvalid do
      error!('invalid record', :unprocessable_entity)
    end

    rescue_from ActiveModel::UnknownAttributeError do |e|
      error!("unknown attribute #{e.attribute}", :unprocessable_entity)
    end

    helpers do
      include ActionController::HttpAuthentication::Token

      def error!(message, status, *args)
        status = Rack::Utils.status_code(status) if status.is_a?(Symbol)
        super(message, status, *args)
      end

      def token
        @token ||= token_params_from(headers['X-Api-Token']).shift[1]
      end

      def authenticate!
        error!('401 Unauthorized', :unauthorized)
      end
    end

    before do
      authenticate!
    end

    mount V1::Base

    add_swagger_documentation \
      doc_version: '0.0.1',
      security_definitions: {
        api_key: {
          type: 'apiKey',
          name: 'X-Api-Token',
          in: 'header'
        }
      },
      models: [
        API::V1::Entities::Student
      ]
  end
end
