# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Heartbeat::Analyze do
  subject(:service) { described_class.call(uid: task_session.id) }

  let(:redis) { Redis.new }
  let(:task_session) { double :task_session, id: 456 }

  before do
    # 2 series of heartbeats for 10 minutes of activity each
    timestamp = 2.hours.ago.to_i
    (0..10).each { |n| redis.rpush('heartbeat:456', (timestamp + n.minutes).to_s) }

    timestamp = 1.hour.ago.to_i
    (0..10).each { |n| redis.rpush('heartbeat:456', (timestamp + n.minutes).to_s) }
  end

  specify 'analyze' do
    expect(service).to eq(20.minutes)
  end
end
