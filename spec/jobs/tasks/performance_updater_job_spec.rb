# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::PerformanceUpdaterJob, type: :job do
  let!(:task) { create :text_task }

  describe '#perform_later' do
    before do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_later(task)
    end

    it 'calls job' do
      expect(described_class).to have_been_enqueued
    end

    it 'matches with enqueued job' do
      expect(described_class).to have_been_enqueued.on_queue(:default)
    end
  end
end
