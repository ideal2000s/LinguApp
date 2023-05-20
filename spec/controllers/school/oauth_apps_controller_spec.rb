# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe OAuthAppsController, type: :controller do
    before do
      sign_in(current_user)
      allow(controller).to receive(:current_team).and_return(team)
      allow(controller).to receive(:current_user).and_return(current_user)
      allow(controller).to receive(:oauth_app).and_return(oauth_app)
      allow(OAuthAppPolicy).to receive(:new).and_return(app_policy)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:team) { create(:team, owner: current_user) }
    let(:oauth_app) { create(:oauth_app, name: Faker::Name.first_name, secret: Faker::Number.number, team: team) }

    let(:app_policy) do
      instance_double(OAuthAppPolicy,
                      create?: true,
                      update?: true,
                      destroy?: true,
                      refresh_secret?: true)
    end

    describe 'POST create' do
      before do
        post :create, params: { name: '', secret: '' }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:update) }
    end

    describe 'DELETE destroy' do
      before do
        allow(oauth_app).to receive(:update).and_return(true)
        delete :destroy, params: { id: oauth_app.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:update) }
    end

    describe 'PUT refresh_secret' do
      before do
        allow(oauth_app).to receive(:update).and_return(true)
        put :refresh_secret, params: { id: oauth_app.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:update) }
    end
  end
end
