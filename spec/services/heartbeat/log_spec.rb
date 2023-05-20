# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Heartbeat::Log do
  subject(:service) { proc { described_class.call(uid: uid) } }

  let(:uid) { 456 }
  let(:redis) { Redis.new }
  let(:key_name) { "heartbeat:#{uid}" }

  specify 'heartbeat adds data to storage' do
    expect { 2.times { service.call } }.to change { redis.llen(key_name) }.to(2)
  end

  specify 'heartbeat stores current timestamp' do
    service.call
    expect(redis.lpop(key_name)).to eq(Time.zone.now.to_i.to_s)
  end
end
