# frozen_string_literal: true

module Heartbeat
  class Analyze
    TIMEOUT = 60 * 2 # 2 minutes

    attr_accessor :uid, :store

    def initialize(uid:, store: Store)
      @uid = uid
      @store = store
    end

    def self.call(*args)
      new(*args).call
    end

    def call
      slices.map { |e| e.last - e.first }.sum
    end

    private

    def slices
      data.slice_when { |i, j| j - i > TIMEOUT }
    end

    def data
      store.pull(uid).map(&:to_i)
    end
  end
end
