# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student profile API', type: :request do
  let(:student) { create(:student) }
  let(:language) { languages(:english) }
  let(:level) { 'undefined' }

  let(:params) do
    {
      student_target_language: {
        language_id: language.id,
        level: level
      }
    }
  end

  before do
    sign_in(student, scope: :student)
  end

  describe 'create new student target language' do
    subject(:language_request) do
      post('/api/profile/student_target_languages', params: params)
    end

    before do
      sign_in(student, scope: :student)
    end

    context 'with valid data' do
      specify 'create with success result' do
        language_request
        expect(response).to have_http_status(:ok)
      end

      specify 'create student target language' do
        expect { language_request }.to change(StudentTargetLanguage, :count).by(1)
      end
    end

    context 'with invalid data' do
      let(:params) do
        {
          student_target_language: {
            language_id: ''
          }
        }
      end

      specify 'error' do
        language_request
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'update student target language' do
    subject(:language_request) do
      patch "/api/profile/student_target_languages/#{student_target_language.id}",
            params: params
    end

    let(:student_target_language) do
      create(:student_target_language, student: student, language: language)
    end

    before do
      sign_in(student, scope: :student)
    end

    context 'with new valid data' do
      specify 'create with success result' do
        language_request
        expect(response).to have_http_status(:ok)
      end

      specify 'create student target language' do
        expect { language_request }.to change(StudentTargetLanguage, :count).by(1)
      end
    end

    context 'with existing valid data' do
      before do
        student_target_language
      end

      let(:level) { 'a1' }

      specify 'update with success result' do
        language_request
        expect(response).to have_http_status(:ok)
      end

      specify 'update student target language' do
        language_request
        expect(student_target_language.reload.level).to eq(level)
      end
    end

    context 'with invalid data' do
      let(:params) do
        {
          student_target_language: {
            level: 'f1'
          }
        }
      end

      specify 'error' do
        language_request
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'destroy student target language' do
    subject(:language_request) do
      delete "/api/profile/student_target_languages/#{student_target_language.id}"
    end

    let(:student_target_language) do
      create(:student_target_language, student: student, language: language)
    end

    before { student_target_language }

    context 'with valid record' do
      specify 'destroy with success result' do
        language_request
        expect(response).to have_http_status(:no_content)
      end

      specify 'destroy student target language' do
        expect { language_request }.to change(StudentTargetLanguage, :count).by(-1)
      end
    end

    context 'with not existing record' do
      subject(:language_request) do
        delete "/api/profile/student_target_languages/#{student_target_language.id}"
      end

      let(:student_target_language) do
        create(:student_target_language, student: student, language: language)
      end

      before { student_target_language.destroy! }

      specify 'error' do
        language_request
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
