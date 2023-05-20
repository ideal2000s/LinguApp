# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe DashboardController, type: :controller do
    before do
      sign_in(current_user)
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(TeamPresenter).to receive(:new).and_return(team_presenter)
      allow(GdprConsenter).to receive(:new).and_return(gdpr_consenter)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user) }
    let(:gdpr_consenter) { instance_double(GdprConsenter, call: true) }
    let(:team_presenter) do
      instance_double(
        TeamPresenter,
        total_time_spent: 0.0,
        students_by_level: [],
        top_lessons: [],
        top_score_students: [],
        inactive_students: []
      )
    end

    describe 'GET #index' do
      before do
        get :index
      end

      context 'when current team is personal team' do
        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template('school/shared/onboarding') }
      end

      context 'when current user has non-existing team assigned' do
        before do
          current_user.update!(default_team_user_id: 1_000_000)
        end

        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template('school/shared/onboarding') }
      end

      context 'when current team is common team' do
        let(:current_team) { create(:team, :school, owner: current_user) }

        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template(:index) }
      end

      context 'when team has no owner (Sentry issue)' do
        let(:current_team) { create(:team) }

        it { is_expected.to respond_with(:ok) }
        it { is_expected.not_to render_template(:index) }
      end
    end

    describe 'POST #agreement' do
      before do
        post :agreement, params: { team_id: current_team.id, processor_name: 'Processor' }
      end

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(school_dashboard_path) }

      it 'updates processor name' do
        current_team.reload
        expect(current_team.gdpr_contact_name).to eq('Processor')
      end
    end
  end
end
