# frozen_string_literal: true

module API
  module V1
    class Base < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      mount Students

      add_swagger_documentation
    end
  end
end
