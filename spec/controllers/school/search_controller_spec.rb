# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe SearchController, type: :controller do
    before do
      sign_in(current_user)
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(SearchPolicy).to receive(:new).and_return(search_policy)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user) }
    let(:search_policy) { instance_double(SearchPolicy, index?: true) }

    describe 'GET #index' do
      before do
        get :index
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:index) }
    end
  end
end
