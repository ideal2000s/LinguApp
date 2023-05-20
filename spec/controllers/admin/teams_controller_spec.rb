# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::TeamsController, type: :controller do
  let(:current_user) { create(:user, :with_admin_role) }

  before { sign_in(current_user) }

  describe 'GET /' do
    before { get :index }

    it { is_expected.to respond_with(:ok) }
    it { is_expected.to render_template(:index) }
  end

  describe 'POST /signin_school' do
    before { post :signin_school, params: { id: team.id } }

    let(:team) { create(:team, :school) }

    it { is_expected.to redirect_to(set_team_school_current_team_url(id: team.id, subdomain: :school)) }

    it 'creates team_user if user has not team user' do
      expect(current_user.team_users.find_by(team: team)).to be_present
    end
  end

  describe 'GET /show' do
    before do
      get :show, params: { id: team.id }
    end

    let(:team) { create(:team) }

    it { is_expected.to respond_with(:ok) }
    it { is_expected.to render_template(:show) }
  end
end
