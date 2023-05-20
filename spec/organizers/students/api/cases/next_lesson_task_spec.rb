# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Students::API::Cases::NextLessonTask do
  subject(:result) { described_class.call(lesson_session: lesson_session) }

  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :with_tasks) }
  let(:tasks) { lesson.tasks }
  let(:lesson_session) { create(:lesson_session, lesson: lesson, student: student) }

  before do
    lesson_session
  end

  context 'when current task is empty' do
    it 'sets current task to first lesson task' do
      # expect(result.value[:session].current_task).to eq(tasks.first)
      expect { result }.to change { lesson_session.reload.current_task }.from(nil).to(tasks[0])
    end
  end

  context 'with current task' do
    let(:lesson_session) { create(:lesson_session, :with_task_session, lesson: lesson, student: student) }

    context 'when current task is active' do
      it 'succeeds' do
        expect(result).to be_success
      end

      it 'does not switch to next task' do
        expect { result }.not_to change(lesson_session, :current_task)
      end
    end

    context 'when current task is complete' do
      before { lesson_session.current_task_session.completed! }

      it 'succeeds' do
        expect(result).to be_success
      end

      it 'switches to next task' do
        expect { result }.to change { lesson_session.reload.current_task }.from(tasks[0]).to(tasks[1])
      end
    end
  end

  context 'when no tasks available' do
    let(:lesson) { create(:lesson) }

    it 'raises error' do
      expect { result }
        .to(raise_error { ActiveRecord::RecordNotFound }
              .and(change { lesson_session.reload.completed? }.from(false).to(true)))
    end
  end
end
