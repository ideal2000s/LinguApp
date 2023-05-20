# frozen_string_literal: true

require 'rails_helper'

module School
  module Students
    RSpec.describe Cases::CreateLicense do
      let(:current_team) { create(:team, owner: current_user) }
      let(:current_user) { create(:user) }
      let(:student) { create(:student) }
      let(:team_student) { create(:team_student, team: current_team, student: student) }
      let(:plan) { create(:plan) }

      describe '#success' do
        subject(:result) do
          described_class.call(current_user: current_user, team_student: team_student, params: { plan_id: plan.id })
        end

        it 'creates license' do
          expect { result }.to change(License, :count).by(1)
        end
      end
    end
  end
end
