# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API', type: :request do
  let(:student) { create :student }
  let(:lesson) { create :lesson, :published, tasks: [task] }
  let(:task) { create :true_false_task, subject: :teach }
  let(:task_items) do
    create(:true_false_item, task: task, veracity: true, statement: 'Correct answer')
    create(:true_false_item, task: task, veracity: false, statement: 'Incorrect answer')
  end

  before do
    task_items

    sign_in student, scope: :student
    post "/api/lessons/#{lesson.id}/session"
    get "/api/lessons/#{lesson.id}/tasks/#{task.id}"
  end

  specify 'task item has solution', :aggregate_failures do
    expect(json.task.items[0]).to have_attributes(correct: true)
    expect(json.task.items[1]).to have_attributes(correct: false)
  end
end
