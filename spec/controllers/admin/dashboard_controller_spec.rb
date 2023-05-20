# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::DashboardController, type: :controller do
  let(:current_user) { create(:user, :with_admin_role) }

  before { sign_in(current_user) }

  describe 'GET /' do
    before { get :index }

    it { is_expected.to respond_with(:ok) }
    it { is_expected.to render_template(:index) }
  end
end
