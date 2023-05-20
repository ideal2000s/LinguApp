# frozen_string_literal: true

require 'rails_helper'

RSpec.describe School::AddTeamGroupPlanJob, type: :job do
  let(:team_group) { create :team_group }
  let(:plan) { create :plan }
  let(:user) { create :user }

  describe '#perform_later' do
    before do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_later(user, team_group.id, plan.id)
    end

    it 'is enqueued' do
      expect(described_class).to have_been_enqueued
    end

    it 'is enqueued with correct args' do
      expect(described_class).to(
        have_been_enqueued.with(user, team_group.id, plan.id)
      )
    end

    it 'matches with enqueued job' do
      expect(described_class).to have_been_enqueued.on_queue(:default)
    end
  end

  describe '#perform_now' do
    before do
      allow(School::AddPlanTeamGroupService).to receive(:new).and_return(add_plan_team_group_service)
    end

    let(:add_plan_team_group_service) { instance_double(School::AddPlanTeamGroupService, assign_license_to_members: {}) }

    context 'with correct arguments' do
      let(:team_group_id) { team_group.id }
      let(:plan_id) { plan.id }

      it 'calls AddPlanTeamGroupService method' do
        described_class.perform_now(user, team_group_id, plan_id)
        expect(add_plan_team_group_service).to have_received(:assign_license_to_members)
          .with(team_group: team_group, plan_id: plan.id)
      end
    end

    context 'when plan_id is blank' do
      let(:team_group_id) { team_group.id }
      let(:plan_id) { '' }

      it 'raises RecordNotFound exception' do
        expect do
          described_class.perform_now(user, team_group_id, plan_id)
        end.to raise_exception(ActiveRecord::RecordNotFound)
      end
    end

    context 'when team_group_id is blank' do
      let(:team_group_id) { nil }
      let(:plan_id) { plan.id }

      it 'raises RecordNotFound exception' do
        expect do
          described_class.perform_now(user, team_group_id, plan_id)
        end.to raise_exception(ActiveRecord::RecordNotFound)
      end
    end
  end
end
