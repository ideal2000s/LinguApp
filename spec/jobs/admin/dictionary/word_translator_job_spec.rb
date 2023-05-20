# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::WordTranslatorJob, type: :job do
  let(:word) { create :dictionary_word }

  describe '#perform_later' do
    before do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_later(word: word)
    end

    it 'is enqueued' do
      expect(described_class).to have_been_enqueued
    end

    it 'is enqueued with correct args' do
      expect(described_class).to(
        have_been_enqueued.with(word: word)
      )
    end

    it 'matches with enqueued job' do
      expect(described_class).to have_been_enqueued.on_queue(:default)
    end
  end
end
