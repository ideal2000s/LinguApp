# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Member Lessons API', type: :request do
  let(:language) { languages(:english) }
  let(:student) { create(:student) }
  let(:lesson_active) { create(:lesson, :published, :with_tasks) }
  let(:lesson_completed) { create(:lesson, :published, :with_tasks) }
  let(:params) { {} }

  before do
    sign_in(student, scope: :student)
  end

  describe 'lessons' do
    subject(:lessons_index) do
      get('/api/profile/lessons', params: params)
    end

    context 'without state param' do
      before do
        lessons_index
      end

      it 'responds with success' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when student has no lessons active' do
      let(:params) { { state: 'active' } }

      before do
        lessons_index
      end

      it 'responds with success' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns empty lessons array' do
        expect(json.lessons).to be_empty
      end
    end

    context 'when student has a lesson session in progress' do
      let(:params) { { state: 'active' } }

      before do
        Students::API::Flows::CreateLessonSession.call(lesson: lesson_completed, student: student)
        lessons_index
      end

      it 'returns 1-item lessons array' do
        expect(json.lessons.length).to eq(1)
      end
    end

    context 'when student has all lessons started' do
      let(:params) { { state: 'active' } }

      before do
        Students::API::Flows::CreateLessonSession.call(lesson: lesson_active, student: student)
        Students::API::Flows::CreateLessonSession.call(lesson: lesson_completed, student: student)

        lessons_index
      end

      it 'returns all lessons' do
        expect(json.lessons.length).to eq(2)
      end
    end

    context 'when student has no lessons finished' do
      let(:params) { { state: 'finished' } }

      before do
        lessons_index
      end

      it 'responds with success' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns empty lessons array' do
        expect(json.lessons).to be_empty
      end
    end

    context 'when student has a lesson session finished' do
      let(:params) { { state: 'finished' } }

      before do
        Students::API::Flows::CreateLessonSession
          .call(lesson: lesson_completed, student: student)
          .on_success do |lesson_session:, **_args|
          lesson_session.completed!
        end
        lessons_index
      end

      it 'returns 1-item lessons array' do
        expect(json.lessons.length).to eq(1)
      end
    end

    context 'when student has all lesson sessions finished' do
      let(:params) { { state: 'finished' } }

      before do
        Students::API::Flows::CreateLessonSession
          .call(lesson: lesson_active, student: student)
          .on_success do |lesson_session:, **_args|
          lesson_session.completed!
        end
        Students::API::Flows::CreateLessonSession
          .call(lesson: lesson_completed, student: student)
          .on_success do |lesson_session:, **_args|
          lesson_session.completed!
        end
        lessons_index
      end

      it 'returns all lessons' do
        expect(json.lessons.length).to eq(2)
      end
    end

    context 'when student has several lesson sessions finished per lesson' do
      let(:params) { { state: 'finished' } }

      before do
        Students::API::Flows::CreateLessonSession
          .call(lesson: lesson_active, student: student)
          .on_success do |lesson_session:, **_args|
          lesson_session.completed!
        end
        Students::API::Flows::CreateLessonSession
          .call(lesson: lesson_completed, student: student)
          .on_success do |lesson_session:, **_args|
          lesson_session.completed!
        end
        Students::API::Flows::CreateLessonSession
          .call(lesson: lesson_completed, student: student)
          .on_success do |lesson_session:, **_args|
          lesson_session.completed!
        end
        lessons_index
      end

      it 'returns distinct lessons' do
        expect(json.lessons.length).to eq(2)
      end
    end

    context 'when student has as active lesson session, as finished session per lesson' do
      let(:params) { { state: 'finished' } }

      before do
        Students::API::Flows::CreateLessonSession
          .call(lesson: lesson_completed, student: student)
          .on_success do |lesson_session:, **_args|
            lesson_session.completed!
          end
        Students::API::Flows::CreateLessonSession.call(lesson: lesson_completed, student: student)
        lessons_index
      end

      it 'returns only finished lessons' do
        expect(json.lessons.length).to eq(1)
      end

      it 'returns 0 if latest finished lesson session duration is not recorded' do
        expect(json.lessons[0].latest_duration).to be_zero
      end

      it 'returns 0 if latest finished lesson session earned_xp is not recorded' do
        expect(json.lessons[0].latest_earned_xp).to be_zero
      end

      it 'returns 0 if latest finished lesson session progress is not recorded' do
        expect(json.lessons[0].latest_progress_percent).to be_zero
      end
    end

    describe 'lesson item' do
      before do
        Students::API::Flows::CreateLessonSession.call(lesson: lesson_completed, student: student)
        lessons_index
      end

      it 'includes lesson description' do
        expect(json.lessons[0].description).to eq(lesson_completed.description)
      end

      it 'includes lesson author info' do
        expect(json.lessons[0].author.name).to eq(lesson_completed.author.name)
      end
    end
  end
end
