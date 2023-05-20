# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API', type: :request do
  let(:student) { create :student }
  let(:lesson) { create :lesson, :published, tasks: [task] }
  let(:task) { create :select_text_task, subject: :teach }
  let(:task_item) { create :select_text_item, task: task, question: 'Stupid question' }
  let(:task_item_options) do
    create(:select_text_item_option, item: task_item, correct: true, answer: 'Correct answer')
    create(:select_text_item_option, item: task_item, correct: false, answer: 'Incorrect answer')
  end

  before do
    task_item_options

    sign_in student, scope: :student
    post "/api/lessons/#{lesson.id}/session"
    get "/api/lessons/#{lesson.id}/tasks/#{task.id}"
  end

  specify 'task item has solution', :aggregate_failures do
    expect(json.task.items.first.options[0]).to have_attributes(correct: true)
    expect(json.task.items.first.options[1]).to have_attributes(correct: false)
  end
end
