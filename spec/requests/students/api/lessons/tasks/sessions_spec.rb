# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student task session API', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published, language: language) }
  let(:task) { create(:essay_task, lesson: lesson) }
  let(:task_item) { create(:essay_item, task: task) }
  let(:user) { create(:user) }
  let(:team) { create(:team, owner: user) }
  let(:language) { languages(:norwegian) }
  let(:request_path) { "/api/lessons/#{lesson.id}/tasks/#{task.id}/session" }

  before do
    sign_in(student, scope: :student)
  end

  describe 'GET #show' do
    subject(:perform_request) { get request_path, params: params }

    let(:params) do
      { lesson_id: lesson.id, task_id: task.id }
    end

    it 'responds with success' do
      perform_request
      expect(response).to have_http_status(:ok)
    end

    context 'when lesson session is missing' do
      it 'creates new lesson session' do
        expect { perform_request }.to change(LessonSession, :count).from(0).to(1)
      end

      it 'creates new task session' do
        expect { perform_request }.to change(TaskSession, :count).from(0).to(1)
      end
    end

    context 'when task session is missing' do
      let(:lesson_session) { create(:lesson_session, student: student, lesson: lesson) }

      before do
        lesson_session
      end

      it 'does not create new lesson session' do
        expect { perform_request }.not_to change(LessonSession, :count)
      end

      it 'creates new task session' do
        expect { perform_request }.to change(TaskSession, :count).from(0).to(1)
      end

      it 'assigns current task session' do
        perform_request
        lesson_session.reload
        expect(lesson_session.current_task_session).to eq(TaskSession.last)
      end
    end

    context 'when lesson session and task session exist' do
      let(:lesson_session) { create(:lesson_session, student: student, lesson: lesson) }
      let(:task_session) { create(:task_session, lesson_session: lesson_session, task: task) }

      before do
        task_session
      end

      it 'does not create new lesson session' do
        expect { perform_request }.not_to change(LessonSession, :count)
      end

      it 'does not create new task session' do
        expect { perform_request }.not_to change(TaskSession, :count)
      end
    end
  end
end
