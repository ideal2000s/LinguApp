# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe ActivitiesController, type: :controller do
    before do
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(ActivityPolicy).to receive(:new).and_return(activity_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user) }
    let(:student) { create(:student) }
    let(:activity) { create(:activity) }
    let(:activity_policy) do
      instance_double(ActivityPolicy, index?: true, activity_logs?: true, undo_activity?: true)
    end

    describe 'GET index' do
      before do
        get :index, params: { student_id: student.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:student_activities) }
    end

    describe 'GET activity_logs' do
      before do
        get :activity_logs, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:activity_logs) }
    end

    describe 'PUT undo_activity' do
      before do
        allow(School::UndoActivityService).to receive(:new).and_return(undo_service)
        put :undo_activity, params: { id: activity.id }, xhr: true
      end

      let(:undo_service) { instance_double(School::UndoActivityService, call: {}) }

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(activity_logs_school_activities_path) }
    end
  end
end
