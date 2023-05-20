# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Cron::PhrasesCountResetJob, type: :job do
  let(:course) { instance_double(Course, set_phrases_count: true) }

  describe '#perform_later' do
    context 'with test queue adapter' do
      before do
        ActiveJob::Base.queue_adapter = :test
        described_class.perform_later
      end

      it 'is enqueued' do
        expect(described_class).to have_been_enqueued
      end

      it 'is enqueued with correct args' do
        expect(described_class).to(
          have_been_enqueued.with
        )
      end

      it 'matches with enqueued job' do
        expect(described_class).to have_been_enqueued.on_queue(:default)
      end
    end
  end

  describe '#perform_now' do
    context 'with real queue adapter' do
      before do
        allow(Course).to receive(:find_each).and_yield(course)
        described_class.perform_now
      end

      it 'sets phrases counts' do
        expect(course).to have_received(:set_phrases_count).once
      end
    end
  end
end
