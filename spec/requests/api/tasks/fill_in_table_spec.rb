# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published, tasks: [task]) }
  let(:task) { create(:fill_in_table_task, subject: :teach) }
  let(:task_item) { create(:fill_in_table_item, task: task, question: 'This is a question') }
  let(:task_item_options) do
    create(:fill_in_table_item_option, item: task_item, answer: 'lift:elevator')
    create(:fill_in_table_item_option, item: task_item, answer: 'earth:moon')
  end

  before do
    task_item_options

    sign_in(student, scope: :student)
    post "/api/lessons/#{lesson.id}/session"
    get "/api/lessons/#{lesson.id}/tasks/#{task.id}"
  end

  specify 'task item has solution', :aggregate_failures do
    expect(json.task.items.first.options[0]).to have_attributes(answers: %w[lift elevator])
    expect(json.task.items.first.options[1]).to have_attributes(answers: %w[earth moon])
  end
end
