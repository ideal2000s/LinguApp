# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API', type: :request do
  let(:student) { create :student }
  let(:lesson) { create :lesson, :published, tasks: [task] }
  let(:task) { create :select_image_task, subject: :teach }
  let(:task_item) { create :select_image_item, task: task, question: 'Stupid question' }
  let(:task_item_options) do
    create :select_image_item_option, item: task_item, correct: true, image: File.open(fixture_file('image.jpg'))
    create :select_image_item_option, item: task_item, correct: false, image: File.open(fixture_file('image.jpg'))
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
