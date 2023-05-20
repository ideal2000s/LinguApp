# frozen_string_literal: true

module HydraAuth
  class Wrapper
    cattr_writer :url

    def initialize(resource: nil, conn: self.class.default_conn, **raw_params)
      self.resource = resource
      self.conn = conn
      self.raw_params = raw_params
    end

    private

    attr_accessor :conn, :resource, :raw_params

    delegate :get, :post, :put, :delete, to: :conn

    class << self
      def url
        @url || 'http://hydra:4445'
      end

      # @return [Faraday::Connection]
      def default_conn
        @default_conn ||=
          Faraday.new(url: url, headers: { 'Content-Type' => 'application/json' }) do |conn|
            conn.request(:json)
            conn.response(:json, content_type: /\bjson$/, parser_options: { object_class: OpenStruct })
            conn.response(:logger, nil, bodies: true, log_level: :debug)
            conn.response(:raise_error)
            conn.adapter(:net_http)
          end
      end
    end
  end
end
