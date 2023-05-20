# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Member Assignments API', type: :request do
  let(:language) { languages(:english) }
  let(:team) { create(:team) }
  let(:student) { create(:student) }
  let(:team_student) { create(:team_student, team: team, student: student) }
  let(:assignment) { create(:assignment, team: team, language: language) }
  let(:student_assignment) { create(:student_assignment, student: student, assignment: assignment) }
  let(:params) { {} }

  before do
    team_student
    sign_in(student, scope: :student)
  end

  describe 'assignments' do
    subject(:assignments_index) do
      get('/api/profile/assignments', params: params)
    end

    context 'when student has no assignments' do
      before do
        assignments_index
      end

      it 'responds with success' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns empty assignments array' do
        expect(json.assignments).to be_empty
      end
    end

    context 'when student has an assignment' do
      before do
        student_assignment
        assignments_index
      end

      it 'returns 1-item assignments array' do
        expect(json.assignments.length).to eq(1)
      end
    end

    describe 'assignment item' do
      before do
        student_assignment
        assignments_index
      end

      it 'includes assignment name' do
        expect(json.assignments[0]).to have_attributes(name: 'school assignment')
      end

      it 'includes assignment instruction' do
        expect(json.assignments[0].instruction).to eq(assignment.instruction)
      end

      it 'includes assignment team info' do
        expect(json.assignments[0].team.name).to eq(assignment.team.name)
      end

      it 'includes student_assignment info' do
        expect(json.assignments[0].student_assignment.status).to eq(assignment.recent_student_assignment(student).status)
      end
    end
  end
end
