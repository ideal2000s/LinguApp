# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::FrequencyCalculatorJob, type: :job do
  let(:language) { languages(:english) }

  describe '#perform_later' do
    it 'recalculates the frequency of language words' do
      ActiveJob::Base.queue_adapter = :test
      expect do
        described_class.perform_later(language)
      end.to have_enqueued_job
    end
  end
end
