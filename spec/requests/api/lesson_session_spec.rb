# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Lesson API', type: :request do
  let(:headers) { { 'Content-Type': 'application/json' } }
  let(:student) { create(:student) }
  let(:task1) { create(:text_task, subject: :teach) }
  let(:task2) { create(:select_text_task, subject: :engage) }
  let(:lesson) { create(:lesson, :published, tasks: [task1, task2]) }

  let(:task1_item) { create(:text_item, task: task1) }

  let(:task2_items) { create_list(:select_text_item, 3, task: task2) }
  let(:task2_options_struct) do
    task2_items.index_with do |item|
      create_list(:select_text_item_option, 3, item: item, answer: 'Answer option')
    end
  end

  before do
    allow(EasyTranslate).to receive(:translate).and_return('translated string')
  end

  describe 'lesson with active session' do
    let(:lesson_session) { create(:lesson_session, :with_task_session, student: student, lesson: lesson) }

    before do
      lesson_session
      sign_in(student, scope: :student)

      get "/api/lessons/#{lesson.id}/session"
    end

    specify 'returns lesson session status' do
      expect(json.lesson_session).to have_attributes(status: 'active')
    end
  end

  describe 'full workflow' do
    before do
      # create outdated session for same lesson
      create(:lesson_session, lesson: lesson, student: student, status: :completed)

      task1_item
      task2_options_struct

      sign_in(student, scope: :student)
    end

    it 'succeeds from lesson public page', :aggregate_failures do
      expected_status(:ok) { get "/api/lessons/#{lesson.id}", headers: headers } # get lesson
      expected_status(:ok) { get "/api/lessons/#{lesson.id}/session", headers: headers }
      expect(json.lesson_session.status).to eq('completed')

      expected_status(:ok) { post "/api/lessons/#{lesson.id}/session", headers: headers } # create new session

      session_id = json.dig(:lesson_session, :id)
      expected_status(:ok) { get "/api/lesson_sessions/#{session_id}", headers: headers } # get session by ID

      expected_status(:ok) { get "/api/lesson_sessions/#{session_id}/task_session", headers: headers } # get current task session

      task_session1 = json[:task_session][:id]
      answer = json.task_session.task_item_sessions.map { |item_session| { id: item_session.id } }
      expected_status(:ok) { get "/api/lessons/#{lesson.id}/tasks/#{task1.id}", headers: headers } # get task details

      expected_status(:ok) do
        get "/api/lessons/#{lesson.id}/tasks/#{task1.id}/session", headers: headers # get task session details
      end

      expected_status(:ok) do
        put "/api/lesson_sessions/#{session_id}/task_sessions/#{task_session1}/answer",
            params: { answer: answer }.to_json,
            headers: headers
      end

      expected_status(:ok) { post "/api/lesson_sessions/#{session_id}/task_sessions/#{task_session1}/complete", headers: headers }
      expected_status(:ok) { post "/api/lesson_sessions/#{session_id}/task_sessions/next", headers: headers }

      task_session2 = json.dig(:task_session, :id)
      answer = json.task_session.task_item_sessions.map { |item_session| { id: item_session.id, answer: true } }
      expected_status(:ok) { get "/api/lessons/#{lesson.id}/tasks/#{task2.id}", headers: headers }
      expected_status(:ok) { get "/api/lessons/#{lesson.id}/tasks/#{task2.id}/session", headers: headers }

      expected_status(:ok) do
        put "/api/lesson_sessions/#{session_id}/task_sessions/#{task_session2}/answer",
            params: { answer: answer }.to_json,
            headers: headers
      end
      expected_status(:forbidden) { get "/api/lesson_sessions/#{session_id}/results", headers: headers }
      expected_status(:ok) { post "/api/lesson_sessions/#{session_id}/task_sessions/#{task_session2}/complete", headers: headers }
      expected_status(:not_found) { post "/api/lesson_sessions/#{session_id}/task_sessions/next", headers: headers }
      expected_status(:ok) { get "/api/lesson_sessions/#{session_id}/results", headers: headers }
    end
  end

  describe 'create lesson session' do
    subject(:request) { post "/api/lessons/#{lesson.id}/session" }

    before do
      task1_item

      sign_in(student, scope: :student)
    end

    specify 'creates new lesson session instance' do
      expect { request }.to change(LessonSession, :count).by(1)
    end

    specify 'pre-creates task item sessions' do
      expect { request }.to change(TaskItemSession, :count).by(2)
    end
  end

  describe 'item session' do
    subject(:request) do
      put "/api/lesson_sessions/#{lesson_session_id}/task_sessions/#{task_session_id}/answer",
          params: { answer: payload }.to_json,
          headers: headers
    end

    let(:task_session) { TaskSession.last }

    let(:lesson_session_id) { LessonSession.last.id }
    let(:task_session_id) { task_session.id }

    let(:payload) do
      task_session.task_item_sessions.map do |item_session|
        { id: item_session.id, task_item_id: item_session.task_item_id }
      end
    end

    before do
      task1_item
      task2_items

      sign_in(student, scope: :student)

      post "/api/lessons/#{lesson.id}/session" # create new lesson session
    end

    specify 'successfully accepts payload' do
      request
      expect(response).to have_http_status(:ok)
    end
  end
end
