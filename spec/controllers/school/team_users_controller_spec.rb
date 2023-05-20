# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe TeamUsersController, type: :controller do
    before do
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(controller).to receive(:current_user).and_return(current_user)
      allow(controller).to receive(:team_user).and_return(team_user)
      allow(TeamUserPolicy).to receive(:new).and_return(team_user_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user, gdpr_consent_at: Time.zone.now) }
    let(:team_user) { instance_double(TeamUser, id: 1, user: current_user, update: true, discard: true) }
    let(:team_user_policy) do
      instance_double(TeamUserPolicy,
                      index?: true,
                      show?: true,
                      new?: true,
                      create?: true,
                      edit?: true,
                      update?: true,
                      destroy?: true,
                      import_team_users?: true,
                      analyze_imported_file?: true,
                      create_batch?: true)
    end

    describe 'GET index' do
      before do
        get :index
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:index) }
    end

    describe 'Get edit' do
      before do
        get :edit, params: { id: team_user.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:edit) }
    end

    describe 'Get new' do
      before do
        get :new, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:new) }
    end

    describe 'DELETE destroy' do
      before do
        delete :destroy, params: { id: team_user.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
    end

    describe 'GET import_team_users' do
      before do
        get :import_team_users, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:import_team_users) }
    end

    describe 'POST analyze_imported_file' do
      before do
        allow(School::ImportFileAnalyzer).to receive(:new).and_return(team_users_file_analyzer)
        post :analyze_imported_file, params: { file: {} }, xhr: true
      end

      let(:team_users_file_analyzer) { instance_double(School::ImportFileAnalyzer, analyze: { file_name: '', users: [] }) }

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:analyze_imported_file) }
    end

    describe 'POST create_batch' do
      before do
        allow(School::TeamUserFactory).to receive(:create_batch).and_return({ imported_users_count: 0 })
        post :create_batch, params: { users: [] }, xhr: true
      end

      let(:team_user_factory) { instance_double(School::TeamUserFactory) }

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(school_team_users_path) }
    end
  end
end
