# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published, tasks: [task]) }
  let(:task) { create(:inline_dropdown_task, subject: :teach) }
  let(:task_item) do
    create(:inline_dropdown_item,
           task: task,
           statement: 'Lorem ipsum *select:first/second/third* dolor sit amet')
  end

  before do
    task_item.update(audio: File.open(fixture_file('audio.mp3')))

    sign_in(student, scope: :student)
    post "/api/lessons/#{lesson.id}/session"
    get "/api/lessons/#{lesson.id}/tasks/#{task.id}"
  end

  specify 'task item has solution' do
    expect(json.task.items.first).to have_attributes(
      solution: ['first']
    )
  end

  specify 'task item has audio' do
    expect(json.task.items.first.audio_url).to be_present
  end
end
