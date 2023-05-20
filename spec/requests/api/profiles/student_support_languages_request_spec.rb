# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student profile API', type: :request do
  let(:student) { create(:student) }
  let(:language) { languages(:english) }
  let(:native) { false }
  let(:params) do
    {
      student_support_language: {
        language_id: language.id,
        native: native
      }
    }
  end

  before do
    sign_in(student, scope: :student)
  end

  describe 'create new student support language' do
    subject(:language_request) do
      post(students_api_profile_student_support_languages_path, params: params)
    end

    context 'with native true' do
      let(:native) { true }
      specify 'create with success result' do
        language_request
        expect(response).to have_http_status(:ok)
      end

      specify 'create student support languages' do
        expect { language_request }.to change(StudentSupportLanguage, :count).by(1)
      end

      specify 'updates native language id' do
        expect { language_request }.to(change(student.reload, :native_student_support_language_id))
      end
    end

    context 'with native false' do
      let(:native) { false }

      specify 'create with success result' do
        language_request
        expect(response).to have_http_status(:ok)
      end

      specify 'create student support languages' do
        expect { language_request }.to change(StudentSupportLanguage, :count).by(1)
      end

      specify 'not updates native language id' do
        expect { language_request }.not_to(
          change(student.reload, :native_student_support_language_id)
        )
      end
    end

    context 'with invalid data' do
      let(:params) do
        {
          student_support_languages: {
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

  describe 'update student support language' do
    subject(:language_request) do
      put "/api/profile/student_support_languages/#{student_support_language.id}",
          params: params
    end

    let!(:student_support_language) do
      create(:student_support_language, student: student, language: language)
    end

    before do
      sign_in(student, scope: :student)
    end

    context 'with native true' do
      let(:native) { true }

      specify 'update with success result' do
        language_request
        expect(response).to have_http_status(:ok)
      end

      specify 'updates native language id' do
        expect { language_request }.to(
          change(student.reload, :native_student_support_language_id)
            .from(nil)
            .to(student_support_language.id)
        )
      end
    end

    context 'with native false' do
      let(:native) { false }

      specify 'update with success result' do
        language_request
        expect(response).to have_http_status(:ok)
      end

      specify 'not updates student support language' do
        expect { language_request }.not_to(
          change(student.reload, :native_student_support_language_id)
        )
      end
    end
  end

  describe 'destroy student support language' do
    subject(:language_request) do
      delete(students_api_profile_student_support_language_path(student_support_language))
    end

    let(:student_support_language) do
      create(:student_support_language, student: student, language: language)
    end

    before { student_support_language }

    context 'with valid record' do
      specify 'destroy with success result' do
        language_request
        expect(response).to have_http_status(:no_content)
      end

      specify 'destroy student support language' do
        expect { language_request }.to change(StudentSupportLanguage, :count).by(-1)
      end
    end

    context 'with not existing record' do
      subject(:language_request) do
        delete(students_api_profile_student_support_language_path(student_support_language))
      end

      let(:student_support_language) do
        create(:student_support_language, student: student, language: language)
      end

      before { student_support_language.destroy! }

      specify 'error' do
        language_request
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
