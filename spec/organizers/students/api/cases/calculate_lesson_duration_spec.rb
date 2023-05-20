# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Students::API::Cases::CalculateLessonDuration do
  subject(:result) { described_class.call(lesson_session: lesson_session) }

  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :with_tasks) }
  let(:tasks) { lesson.tasks }
  let(:lesson_session) { create(:lesson_session, lesson: lesson, student: student, status: :completed) }

  let(:task_sessions) do
    tasks.map { |task| create(:task_session, task: task, lesson_session: lesson_session, duration: 10, status: :completed) }
  end

  before do
    lesson_session
  end

  context 'when lesson_session is completed' do
    before do
      task_sessions
    end

    specify 'calculate lesson_session duration' do
      expect { result }.to change(lesson_session, :duration).to(20)
    end

    specify 'calculate average lesson duration' do
      expect { result }.to change(lesson, :average_duration).to(20)
    end
  end

  context 'with multiple lesson_sessions' do
    before do
      task_sessions
      # current session has duration of 20
      create(:lesson_session, lesson: lesson, status: :completed, duration: 100)
      create(:lesson_session, lesson: lesson, status: :completed, duration: 150)
      create(:lesson_session, lesson: lesson, status: :completed, duration: 130)
    end

    specify 'calculate average duration' do
      expect { result }.to change(lesson, :average_duration).to(100)
    end
  end
end
