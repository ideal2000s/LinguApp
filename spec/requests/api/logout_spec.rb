# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student logout API', type: :request do
  subject(:logout_request) { delete '/api/students/sign_out' }

  let(:student) { create(:student) }

  context 'with no session' do
    before { logout_request }

    it 'returns success status' do
      expect(response).to have_http_status(:ok)
    end
  end

  context 'with existing session' do
    before do
      sign_in(student, scope: :student)
      logout_request
    end

    it 'returns authenticity token' do
      expect(json.authenticity_token).not_to be_nil
    end

    it 'returns success status' do
      expect(response).to have_http_status(:ok)
    end

    it 'destroys session' do
      get '/api/profile'

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
