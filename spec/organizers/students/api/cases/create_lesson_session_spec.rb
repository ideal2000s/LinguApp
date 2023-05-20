# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Students::API::Cases::CreateLessonSession do
  subject(:result) { described_class.call(lesson: lesson, student: student) }

  let(:lesson) { create(:lesson, :with_tasks) }
  let(:tasks) { lesson.tasks }
  let(:student) { create(:student) }

  context 'when no previous session' do
    it 'returns success value' do
      expect(result).to be_success
    end

    it 'creates new session' do
      expect { result }.to change(LessonSession, :count).by(1)
    end

    it 'assigns lesson status' do
      expect(result.value[:lesson_session]).to have_attributes(status: 'active')
    end
  end

  context 'when there is an active lesson session' do
    let(:lesson_session) { create(:lesson_session, lesson: lesson, student: student) }

    before { lesson_session }

    it 'marks previous session as canceled' do
      expect { result }.to change { lesson_session.reload.status }.to('canceled')
    end

    it 'creates new active session' do
      expect { result }.to change(LessonSession, :count).by(1)
    end

    it 'returns new session' do
      expect(result.value).not_to eq(lesson_session)
    end
  end
end
