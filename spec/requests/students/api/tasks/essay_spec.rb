# frozen_string_literal: true

RSpec.describe 'Tasks::Essay students API requests', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published, team: lesson_team, language: language) }
  let(:task) { create(:essay_task, lesson: lesson) }
  let(:task_item) { create(:essay_item, task: task) }
  let(:user) { create(:user) }
  let(:lesson_team) { create(:team, owner: user) }
  let(:language) { languages(:norwegian) }
  let(:request_path) { "/api/lessons/#{lesson.id}/tasks/#{task.id}" }

  before do
    sign_in(student, scope: :student)
  end

  describe 'GET /api/lessons/:lesson_id/tasks/:id' do
    let(:perform_request) do
      get(request_path)
    end

    it 'returns success result' do
      perform_request
      expect(response).to have_http_status(:ok)
    end

    context 'when no license' do
      it 'renders reviewer from lesson' do
        perform_request
        expect(json.task.reviewer.name).to eq(lesson_team.name)
      end
    end

    context 'when active license' do
      let(:new_team) { create(:team, name: 'New school team') }
      let(:plan) { create(:plan, name: 'Personal plan', language: language) }
      let(:team_student) { create(:team_student, team: new_team, student: student) }

      before { team_student.licenses.create(plan: plan) }

      it 'renders reviewer from lesson' do
        perform_request
        expect(json.task.reviewer.name).to eq(new_team.name)
      end
    end
  end
end
