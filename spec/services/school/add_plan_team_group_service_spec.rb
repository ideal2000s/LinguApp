# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe AddPlanTeamGroupService, type: :service do
    subject(:assign_license_result) do
      described_class.assign_license_to_members(team_group: team_group, plan_id: plan.id)
    end

    let(:current_team) { create(:team) }
    let(:current_user) { create(:user, teams: [current_team]) }
    let(:team_group) { create(:team_group, team: current_team) }
    let(:plan) { create(:plan) }
    let(:student1) { create(:student) }
    let(:student2) { create(:student) }

    before do
      create(:team_student, student: student1, team_group: team_group)
      create(:team_student, student: student2, team_group: team_group)
    end

    describe '#assign_license_to_members' do
      it 'creates 2 licenses' do
        expect { assign_license_result }.to change(License, :count).by(2)
      end
    end
  end
end
