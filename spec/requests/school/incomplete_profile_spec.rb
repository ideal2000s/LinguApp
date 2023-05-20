# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Teach incomplete profile checker', type: :request do
  subject { response }

  let(:user) { create(:user, :with_default_team) }

  before do
    sign_in(user, scope: :user)
    host! 'school.example.com'
  end

  context 'when valid user' do
    before { get '/dashboard' }

    it { is_expected.to have_http_status(:ok) }
  end

  context 'when invalid user' do
    before do
      allow(user).to receive(:valid?).and_return(false)
      get '/dashboard'
    end

    it { is_expected.to have_http_status(:found) }
    it { is_expected.to redirect_to(incomplete_profile_path) }
  end
end
