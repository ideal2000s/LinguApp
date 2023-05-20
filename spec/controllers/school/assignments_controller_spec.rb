# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe AssignmentsController, type: :controller do
    before do
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(controller).to receive(:current_user).and_return(current_user)
      allow(controller).to receive(:document).and_return(document)
      allow(AssignmentPolicy).to receive(:new).and_return(assignment_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user, gdpr_consent_at: Time.zone.now) }
    let(:document) { create(:document, assignable: task, student: student) }
    let(:task) { create(:essay_task) }
    let(:task_item) { create(:essay_item, task: task) }
    let(:student) { create(:student) }
    let(:assignment_policy) do
      instance_double(AssignmentPolicy, index?: true, show?: true)
    end

    describe 'GET index' do
      before do
        get :index
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:index) }
    end

    describe 'Get show' do
      before do
        get :show, params: { id: document.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:show) }
    end
  end
end
