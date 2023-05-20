# frozen_string_literal: true

module Converters
  class URLToPDF
    CONVERTER_URL = 'https://pdf.railsme.ninja/url'
    HTTP_CONTENT_TYPE = 'application/json'

    def initialize(url)
      @url = url
    end

    def call
      connection = Faraday.new(url: CONVERTER_URL)
      connection.basic_auth(*basic_auth_credentials)
      connection.post do |request|
        request.headers['Content-Type'] = HTTP_CONTENT_TYPE
        request.body = body
      end.body
    end

    private

    attr_reader :url

    def body
      { url: url }.to_json
    end

    def basic_auth_credentials
      ENV.fetch('PDF_GENERATOR_BASIC_AUTH').to_s.split(':')
    end
  end
end
