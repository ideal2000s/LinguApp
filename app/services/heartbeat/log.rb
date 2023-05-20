# frozen_string_literal: true

module Heartbeat
  class Log
    attr_accessor :uid, :store

    def initialize(uid:, store: Store)
      @uid = uid
      @store = store
    end

    def self.call(*args)
      new(*args).call
    end

    def call
      store.push(uid, value)
    end

    private

    def value
      Time.zone.now.to_i.to_s
    end
  end
end
