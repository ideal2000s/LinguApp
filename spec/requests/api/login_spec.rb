# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student login API', type: :request do
  subject(:login_request) do
    post '/api/students/otp', params: { student: { email: email } }
    post '/api/students/sign_in', params: sign_in_params
  end

  let(:sign_in_params) { { student: { email: email, password: code } } }
  let(:student) { create(:student) }
  let(:email) { student.email }
  let(:letter) { ActionMailer::Base.deliveries.last }
  let(:code) { letter.body.raw_source.scan(/\d{6}/).first }

  before do
    allow(Timezone).to receive(:lookup).and_return(OpenStruct.new(name: 'Norway/Oslo'))
    login_request
  end

  context 'with valid credentials' do
    it 'succeeds' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns student profile' do
      expect(json.profile).to have_attributes(
        id: student.id,
        fname: student.fname,
        lname: student.lname,
        email: student.email,
        locale: student.locale
      )
    end
  end

  context 'with invalid otp code' do
    let(:code) { '132435' }

    it 'fails' do
      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns error message' do
      expect(json).to have_attributes(error: I18n.t('devise.failure.invalid'))
    end
  end

  context 'with invalid password hash' do
    subject(:login_request) do
      post '/api/students/otp', params: { student: { email: email } }
      student.update(encrypted_password: 'bad hash')
      post '/api/students/sign_in', params: sign_in_params
    end

    it 'unauthorized' do
      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns error message' do
      expect(json).to have_attributes(error: I18n.t('devise.failure.invalid'))
    end
  end

  context 'with locale and signed in student' do
    let(:sign_in_params) { { student: { email: email, password: code }, locale: 'ru' } }

    before do
      sign_in(student, scope: :student)
    end

    it 'succeeds' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns student profile with an updated locale' do
      expect(json.profile).to have_attributes(
        id: student.id,
        fname: student.fname,
        lname: student.lname,
        email: student.email,
        locale: 'nb'
      )
    end
  end
end
