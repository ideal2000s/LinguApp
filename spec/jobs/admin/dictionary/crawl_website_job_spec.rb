# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::CrawlWebsiteJob, type: :job do
  let(:crawler) { create :dictionary_crawler }

  describe '#perform_later' do
    before do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_later(crawler.id)
    end

    it 'is enqueued' do
      expect(described_class).to have_been_enqueued
    end

    it 'is enqueued with correct args' do
      expect(described_class).to(
        have_been_enqueued.with(crawler.id)
      )
    end

    it 'matches with enqueued job' do
      expect(described_class).to have_been_enqueued.on_queue(:low_priority)
    end
  end
end
