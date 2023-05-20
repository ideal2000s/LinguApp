# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe CurrentTeamsController, type: :controller do
    before do
      sign_in(current_user)
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(controller).to receive(:current_user).and_return(current_user)
      allow(TeamPolicy).to receive(:new).and_return(team_policy)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user) }
    let(:team_policy) do
      instance_double(TeamPolicy, edit?: true, update?: true)
    end

    describe 'POST create' do
      before do
        post :create, params: { id: current_team.id }
      end

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(root_path) }
    end

    describe 'Get edit' do
      before do
        get :edit, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:edit) }
    end

    describe 'PUT update' do
      context 'with valid params' do
        before do
          allow(current_team).to receive(:update).and_return(true)
          put :update, params: { team: { name: 'name' } }, xhr: true
        end

        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template(:form_submit) }
      end

      context 'with invalid params' do
        before do
          allow(current_team).to receive(:update).and_return(false)
          put :update, params: { team: { name: 'name' } }, xhr: true
        end

        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template(:edit) }
      end
    end
  end
end
