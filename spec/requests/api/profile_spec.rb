# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student profile API', type: :request do
  let!(:student) { create(:student) }
  let!(:team) { create(:team) }
  let!(:team_student) { create(:team_student, team: team, student: student) }
  let!(:plan) { create(:plan) }
  let!(:license) { create(:license, plan: plan, team_student: team_student) }
  let!(:student_identity) { create(:student_identity, student: student) }
  let!(:student_native_language) do
    create(:student_support_language, student: student, language: languages(:english), native: true)
  end
  let!(:student_support_language) { create(:student_support_language, student: student, language: languages(:danish)) }
  let!(:target_langage) { create(:student_target_language, student: student, language: languages(:norwegian), active: true) }

  describe 'get profile' do
    subject(:profile_request) { get '/api/profile' }

    context 'when user is authenticated' do
      before do
        team_student.active_license = license
        student_identity
        sign_in(student, scope: :student)
        profile_request
      end

      specify 'it returns student profile' do
        expect(response).to have_http_status(:ok)
      end

      specify 'it returns profile' do
        expect(json).to have_attributes(
          id: student.id,
          fname: student.fname,
          lname: student.lname,
          email: student.email,
          locale: student.locale,
          gender: student.gender,
          ssn: student.ssn,
          mobile: student.mobile
        )
      end

      specify 'it returns active_licenses' do
        expect(json.active_licenses[0]).to have_attributes(
          team_student_id: team_student.id,
          expires_at: license.expires_at
        )
      end

      specify 'it returns team details per license' do
        expect(json.active_licenses[0].team).to have_attributes(
          id: team.id,
          followers_count: team.followers_count,
          name: team.name
        )
      end

      specify 'it returns student_identities' do
        expect(json.student_identities[0]).to have_attributes(
          student_id: student.id,
          provider: student_identity.provider,
          uid: student_identity.uid
        )
      end
    end

    context 'when not authenticated' do
      before { profile_request }

      specify 'it returns error' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'update profile' do
    subject(:profile_request) { patch '/api/profile', params: params }

    let(:new_fname) { Faker::Lorem.characters(number: 5) }

    let(:params) do
      {
        student: {
          fname: new_fname
        }
      }
    end

    before do
      sign_in(student, scope: :student)
    end

    context 'with valid data' do
      specify 'update with success result' do
        profile_request
        expect(response).to have_http_status(:ok)
      end

      specify 'update language settings' do
        expect { profile_request }.to change(student, :fname).to(new_fname)
      end
    end

    context 'with invalid data' do
      let(:params) { {} }

      specify 'error' do
        profile_request
        expect(response).to have_http_status(:bad_request)
      end
    end
  end

  describe 'destroy profile' do
    subject(:profile_request) { delete '/api/profile' }

    before do
      sign_in(student, scope: :student)
    end

    specify 'responds with no_content' do
      profile_request
      expect(response).to have_http_status(:no_content)
    end

    specify 'does not destroy student record' do
      expect { profile_request }.not_to change(Student, :count)
    end

    specify 'discards student record instead' do
      expect { profile_request }.to change(Student.kept, :count).by(-1)
    end
  end
end
