# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'OTP', type: :request do
  subject { response }

  before do
    host! 'school.example.com'
  end

  describe 'HTML post' do
    context 'without email' do
      let(:params) { {} }

      before { post '/users/otp', params: params }

      it { is_expected.to have_http_status(:ok) }
    end

    context 'with blank email' do
      let(:params) { { user: { email: '' } } }

      before { post '/users/otp', params: params }

      it { is_expected.to have_http_status(:ok) }
    end

    context 'with email' do
      let(:params) { { user: { email: 'email@example.com' } } }

      before { post '/users/otp', params: params }

      it { is_expected.to redirect_to(request_otp_user_session_path) }
    end
  end

  describe 'HTML get' do
    context 'without email' do
      let(:params) { {} }

      before { get '/users/otp', params: params }

      it { is_expected.to have_http_status(:ok) }
    end

    context 'with blank email' do
      let(:params) { { user: { email: '' } } }

      before { get '/users/otp', params: params }

      it { is_expected.to have_http_status(:ok) }
    end

    context 'with email' do
      let(:params) { { user: { email: 'email@example.com' } } }

      before { get '/users/otp', params: params }

      it { is_expected.to have_http_status(:ok) }
    end
  end

  describe 'JSON' do
    context 'without email' do
      let(:params) { { format: 'json' } }

      before { post '/users/otp', params: params }

      it { is_expected.to have_http_status(:unprocessable_entity) }
    end

    context 'with blank email' do
      let(:params) { { user: { email: '' }, format: 'json' } }

      before { post '/users/otp', params: params }

      it { is_expected.to have_http_status(:unprocessable_entity) }
    end

    context 'with email' do
      let(:params) { { user: { email: 'email@example.com' }, format: 'json' } }

      before { post '/users/otp', params: params }

      it { is_expected.to have_http_status(:created) }
    end
  end
end
