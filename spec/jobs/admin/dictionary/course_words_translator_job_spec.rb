# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::CourseWordsTranslatorJob, type: :job do
  let(:course) { create :course }

  describe '#perform_later' do
    before do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_later(course: course)
    end

    it 'is enqueued' do
      expect(described_class).to have_been_enqueued
    end

    it 'is enqueued with correct args' do
      expect(described_class).to(
        have_been_enqueued.with(course: course)
      )
    end

    it 'matches with enqueued job' do
      expect(described_class).to have_been_enqueued.on_queue(:default)
    end
  end
end
