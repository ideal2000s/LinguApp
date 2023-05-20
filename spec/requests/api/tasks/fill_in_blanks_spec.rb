# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published, tasks: [task]) }
  let(:task) { create(:fill_in_blanks_task, subject: :teach) }
  let(:task_item) { create(:fill_in_blanks_item, task: task, question: 'Earth is *flat*') }

  before do
    task_item

    sign_in(student, scope: :student)
    post "/api/lessons/#{lesson.id}/session"
    get "/api/lessons/#{lesson.id}/tasks/#{task.id}"
  end

  specify 'task item has solution' do
    expect(json.task.items.first).to have_attributes(solution: [['flat']])
  end
end
