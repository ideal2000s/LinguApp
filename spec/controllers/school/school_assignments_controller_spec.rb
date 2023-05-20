# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe SchoolAssignmentsController, type: :controller do
    before do
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(controller).to receive(:current_user).and_return(current_user)
      allow(controller).to receive(:assignment).and_return(assignment)
      allow(SchoolAssignmentPolicy).to receive(:new).and_return(school_assignment_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user, gdpr_consent_at: Time.zone.now) }
    let(:assignment) { create(:assignment, team: team, language: language) }
    let(:team) { create(:team) }
    let(:language) { create(:language) }
    let(:school_assignment_policy) do
      instance_double(SchoolAssignmentPolicy, index?: true, new?: true, create?: true, show?: true,
                                              assign_student?: true, assign_student_post?: true, review?: true)
    end

    describe 'GET index' do
      before do
        get :index
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:index) }
    end

    describe 'GET new' do
      before do
        get :new, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:new) }
    end

    describe 'Get show' do
      before do
        get :show, params: { id: assignment.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:show) }
    end
  end
end
