# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Students::API::Cases::AutoCompleteAnswers do
  subject(:result) { described_class.call(task_session: task_session) }

  let(:lesson_session) { create :lesson_session, lesson: lesson }
  let(:task_session) { create :task_session, lesson_session: lesson_session, task: tasks.first }
  let(:task_item_session) { create :task_item_session, task_session: task_session, task_item: tasks.first.items.first }
  let(:lesson) { create(:lesson, :with_tasks) }
  let(:tasks) { lesson.tasks }

  before do
    task_item_session
  end

  specify 'completes task item sessions' do
    expect { result }.to change { task_item_session.reload.completed }.to(true)
  end

  specify 'completes task session' do
    expect { result }.to change(task_session, :status).to('completed')
  end
end
