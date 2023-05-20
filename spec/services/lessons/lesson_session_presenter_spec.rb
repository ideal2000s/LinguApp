# frozen_string_literal: true

require 'rails_helper'

STRUCTURE = <<-STRUCTURE
  {
    'sections' => {
      'teach' => {
        'title' => 'Teach',
        'progress' => 100,
        'tasks' => [
          {
            'title' => 'Text task',
            'progress' => 100
          }
        ]
      }
    },
    'progress' => {
      'completed' => 5,
      'total' => 10,
      'percents' => 50,
    }
  }
STRUCTURE

RSpec.describe Lessons::LessonSessionPresenter do
  subject(:service) { described_class.call(lesson_session) }

  let(:lesson) { create(:lesson, :published, tasks: [task1, task2, task3, task4]) }
  let(:task1) { create(:text_task, subject: :teach) }
  let(:task2) { create(:arrange_words_task, subject: :engage) }
  let(:task3) { create(:fill_in_blanks_task, subject: :engage) }
  let(:task4) { create(:mark_word_task, subject: :test) }
  let(:student) { create(:student) }

  let(:lesson_session) do
    create(
      :lesson_session,
      lesson: lesson,
      progress: {
        task1.id => [1],
        task2.id => [1, 1, 0],
        task3.id => [0, 0, 0, 1, 1],
        task4.id => [0, 0]
      }
    )
  end

  specify 'teach section is fully complete' do
    expect(service.dig(:sections, :teach, :progress)).to eq(100)
  end

  specify 'engage section is complete by 66%' do
    expect(service.dig(:sections, :engage, :progress)).to eq(50)
  end

  specify 'check section is complete by 0' do
    expect(service.dig(:sections, :test, :progress)).to eq(0)
  end

  describe 'progress summary' do
    context 'when lesson session is not completed and has no task sessions' do
      let(:lesson_session) do
        Students::API::Flows::CreateLessonSession.call(lesson: lesson, student: student).value[:lesson_session]
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(0)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(0)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(0)
      end
    end

    context 'when lesson session is not completed and has a task session completed' do
      let(:lesson_session) do
        Students::API::Flows::CreateLessonSession.call(lesson: lesson, student: student).value[:lesson_session]
      end
      let(:task_session) { lesson_session.current_task_session }

      before do
        Students::API::Flows::CompleteTaskSession.call(task_session: task_session)
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(1)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(4)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(25)
      end
    end

    context 'when lesson session is completed' do
      let(:lesson_session) do
        Students::API::Flows::CreateLessonSession.call(lesson: lesson, student: student).value[:lesson_session]
      end

      before do
        Students::API::Flows::CompleteTaskSession.call(task_session: lesson_session.current_task_session)
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(1)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(4)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(25)
      end
    end

    context 'with part of tasks completed' do
      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(5)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(11)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(45)
      end
    end

    context 'when there are no tasks completed' do
      let(:lesson_session) do
        create(
          :lesson_session,
          lesson: lesson,
          progress: {
            task1.id => [0],
            task2.id => [0, 0, 0],
            task3.id => [0, 0, 0, 0, 0],
            task4.id => [0, 0]
          }
        )
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(0)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(11)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(0)
      end
    end

    context 'when tasks progresses are empty arrays' do
      let(:lesson_session) do
        create(
          :lesson_session,
          lesson: lesson,
          progress: {
            task1.id => [],
            task2.id => [],
            task3.id => [],
            task4.id => []
          }
        )
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(0)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(0)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(0)
      end
    end

    context 'when tasks progresses have nil values' do
      let(:lesson_session) do
        create(
          :lesson_session,
          lesson: lesson,
          progress: {
            task1.id => [nil],
            task2.id => [nil],
            task3.id => [nil],
            task4.id => [nil]
          }
        )
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(0)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(4)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(0)
      end
    end

    context 'when tasks progresses have numeric and nil values' do
      let(:lesson_session) do
        create(
          :lesson_session,
          lesson: lesson,
          progress: {
            task1.id => [1, nil],
            task2.id => [0, nil],
            task3.id => [1, nil],
            task4.id => [nil, nil]
          }
        )
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(2)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(8)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(25)
      end
    end

    context 'when not all tasks progresses have values' do
      let(:lesson_session) do
        create(
          :lesson_session,
          lesson: lesson,
          progress: {
            task1.id => [1, nil],
            task2.id => [0, nil],
            task3.id => nil
          }
        )
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(1)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(5)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(20)
      end
    end

    context 'when progress is empty' do
      let(:lesson_session) do
        create(
          :lesson_session,
          lesson: lesson,
          progress: {}
        )
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(0)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(0)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(0)
      end
    end

    context 'when progress is nil' do
      let(:lesson_session) do
        create(
          :lesson_session,
          lesson: lesson,
          progress: nil
        )
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(0)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(0)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(0)
      end
    end

    context 'when all tasks completed' do
      let(:lesson_session) do
        create(
          :lesson_session,
          lesson: lesson,
          progress: {
            task1.id => [1],
            task2.id => [1, 1, 1],
            task3.id => [1, 1, 1, 1, 1],
            task4.id => [1, 1]
          }
        )
      end

      it 'calculates how many task items completed' do
        expect(service.dig(:progress, :completed)).to eq(11)
      end

      it 'calculates total of task items in lesson' do
        expect(service.dig(:progress, :total)).to eq(11)
      end

      it 'returns percent of task items completed' do
        expect(service.dig(:progress, :percents)).to eq(100)
      end
    end
  end
end
