# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe UndoActivityService, type: :service do
    let(:current_user) { create(:user) }
    let(:current_team) { create(:team, owner: current_user) }
    let(:student) { create(:student) }
    let(:team_student) { create(:team_student, team: current_team, student: student, active_license: license) }
    let(:license) { create(:license) }
    let(:license_activity) { create(:activity, trackable: license, owner: current_user, recipient: student) }
    let(:team_student_activity) do
      create(:activity, trackable: team_student, owner: current_user, recipient: student)
    end

    describe 'license_activity' do
      subject(:undo_service) do
        described_class.call(current_team: current_team, activity: license_activity, current_user: current_user)
      end

      before do
        team_student
      end

      context 'when license_created' do
        it 'revokes license' do
          license_activity.update(key: 'license.create')
          undo_service
          expect(current_team.team_students.first.active_license).not_to be_nil
        end
      end

      context 'when license_updated' do
        it 'resets expires date' do
          license_activity.update(key: 'license.update')
          undo_service
          expect(team_student.active_license.expires_at).to be_nil
        end
      end

      context 'when license_revoked' do
        it 'reassigns license' do
          license.team_student.update(active_license: nil)
          license_activity.update(key: 'license.revoke')
          expect { undo_service }.to change(License, :count).by(1)
        end
      end
    end
  end
end
