# frozen_string_literal: true

require 'rails_helper'

RSpec.describe School::AddTeamUserHubspotJob, type: :job do
  let(:team) { create :team }
  let(:user) { create :user }

  describe '#perform_later' do
    let(:team_user) { create :team_user, team: team, user: user }

    before do
      ActiveJob::Base.queue_adapter = :test
      team_user
    end

    it 'is enqueued with correct args' do
      expect(described_class).to(
        have_been_enqueued.with(team_user.id)
      )
    end
  end
end
