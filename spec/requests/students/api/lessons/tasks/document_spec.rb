# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student task document API', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published, language: language) }
  let(:task) { create(:essay_task, lesson: lesson) }
  let(:task_item) { create(:essay_item, task: task) }
  let(:user) { create(:user) }
  let(:team) { create(:team, owner: user) }
  let(:language) { languages(:norwegian) }
  let(:request_path) { "/api/lessons/#{lesson.id}/tasks/#{task.id}/document" }

  before do
    sign_in(student, scope: :student)
  end

  describe 'POST document' do
    subject(:perform_request) { post(request_path, params: params) }

    let(:params) do
      { document: { content: 'My awesome assignment' } }
    end

    it 'returns success result' do
      perform_request
      expect(response).to have_http_status(:created)
    end

    it 'creates document' do
      expect { perform_request }.to change(Document, :count).by(1)
    end

    context 'when no team license' do
      before { perform_request }

      it { expect(Document.last.team).to eq(lesson.team) }
    end

    context 'with team license' do
      let(:new_team) { create(:team, name: 'New school team') }
      let(:plan) { create(:plan, name: 'Personal plan', language: language) }
      let(:team_student) { create(:team_student, team: new_team, student: student) }

      before do
        team_student.licenses.create(plan: plan)
        perform_request
      end

      it { expect(Document.last.team).to eq(new_team) }
      it { expect(lesson.team).not_to eq(new_team) }
    end
  end

  describe 'GET document' do
    subject(:perform_request) { get(request_path) }

    context 'when no document exists' do
      it 'returns not found result' do
        perform_request
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when document exists' do
      before do
        student.documents.create(assignable: task, content: 'Document content')
      end

      it 'returns success result' do
        perform_request
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
