# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::CollectionTranslatorJob, type: :job do
  let(:collection) { create :dictionary_collection }

  describe '#perform_later' do
    before do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_later(collection: collection)
    end

    it 'is enqueued' do
      expect(described_class).to have_been_enqueued
    end

    it 'is enqueued with correct args' do
      expect(described_class).to(
        have_been_enqueued.with(collection: collection)
      )
    end

    it 'matches with enqueued job' do
      expect(described_class).to have_been_enqueued.on_queue(:default)
    end
  end
end
