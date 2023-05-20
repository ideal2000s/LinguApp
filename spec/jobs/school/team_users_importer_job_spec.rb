# frozen_string_literal: true

require 'rails_helper'

RSpec.describe School::TeamUsersImporterJob, type: :job do
  let(:team) { create :team }
  let(:users_params) do
    {}
  end
  let(:user) { create :user }

  describe '#perform_later' do
    before do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_later(user, team, users_params)
    end

    it 'calls job' do
      expect(described_class).to have_been_enqueued
    end

    it 'matches with enqueued job' do
      expect(described_class).to have_been_enqueued.on_queue(:default)
    end
  end
end
