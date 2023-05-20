# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student assignments API', type: :request do
  let(:student) { create(:student) }
  let(:user) { create(:user) }
  let(:team) { create(:team, owner: user) }
  let(:language) { create(:language) }
  let(:assignment) { create(:assignment, team: team, language: language) }
  let(:student_assignment) { create(:student_assignment, student: student, assignment: assignment) }

  describe 'get assignments' do
    subject(:assignments_request) { get '/api/assignments' }

    context 'when user is authenticated' do
      before do
        sign_in(student, scope: :student)
        student_assignment
        assignments_request
      end

      specify 'it returns student feed' do
        expect(response.status).to eq(200)
      end

      specify 'it returns feed' do
        expect(json.assignments[0]).to have_attributes(name: 'school assignment')
      end
    end

    context 'when user is not authenticated' do
      before { assignments_request }

      specify 'it returns error' do
        expect(response.status).to eq(401)
      end
    end
  end
end
