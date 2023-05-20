# frozen_string_literal: true

module Heartbeat
  PREFIX = 'heartbeat:'

  class Store
    class << self
      def push(id, value)
        engine.rpush(store_key(id), value)
      end

      def pull(id)
        engine.lrange(store_key(id), 0, -1)
      end

      private

      def engine
        @engine ||= Redis.new
      end

      def store_key(id)
        "#{PREFIX}#{id}"
      end
    end
  end
end
