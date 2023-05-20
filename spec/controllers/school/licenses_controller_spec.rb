# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe LicensesController, type: :controller do
    before do
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(controller).to receive(:team_student).and_return(team_student)
      allow(LicensePolicy).to receive(:new).and_return(license_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user) }
    let(:team_student) { create(:team_student, team: current_team, student: student) }
    let(:student) { create(:student) }
    let(:plan) { create(:plan) }
    let(:license) { create(:license, plan: plan, team_student: team_student) }
    let(:license_policy) do
      instance_double(LicensePolicy,
                      create?: true,
                      update?: true,
                      destroy?: true,
                      revoke_license?: true)
    end

    describe 'POST create' do
      before do
        post :create, params: { team_student_id: team_student.id, plan_id: plan.id }
      end

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(school_student_path(student)) }
    end

    describe 'PATCH update' do
      before do
        patch :update, params: { team_student_id: team_student.id, id: license.id, license: { expiration_date: '2020-10-01' } }
      end

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(school_student_path(student)) }
    end

    describe 'DELETE destroy' do
      before do
        delete :destroy, params: { team_student_id: team_student.id, id: license.id }
      end

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(school_student_path(student)) }
    end
  end
end
