# frozen_string_literal: true

require 'rails_helper'

RSpec.describe School::StudentsImporterJob, type: :job do
  let(:team_group) { create :team_group }
  let(:plan) { create :plan }
  let(:team) { create :team }
  let(:user) { create :user }
  let(:student_params) do
    {}
  end

  describe '#perform_later' do
    before do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_later(user, team, student_params, team_group.id, plan.id)
    end

    it 'calls job' do
      expect(described_class).to have_been_enqueued
    end

    it 'matches with enqueued job' do
      expect(described_class).to have_been_enqueued.on_queue(:default)
    end
  end
end
