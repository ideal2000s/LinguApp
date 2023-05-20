# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::WordsImporterJob, type: :job do
  let(:text) { 'I go to school.' }
  let(:language) { languages(:english) }
  let(:user) { create(:user) }

  describe '#perfom_later' do
    it 'imports words from text' do
      ActiveJob::Base.queue_adapter = :test
      expect do
        described_class.perform_later(text: text, language: language, user: user)
      end.to have_enqueued_job
    end
  end
end
