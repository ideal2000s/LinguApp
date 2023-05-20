# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API', type: :request do
  let(:task_item_phrase) { 'Something wrong with the world today' }
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published, tasks: [task]) }
  let(:task) { create(:arrange_words_task, subject: :teach) }
  let(:task_item) { task.items.first }

  before do
    stub_google_translate

    # update task item since we won't want to mess around with creation of default task item
    task_item.update(
      arrange_words: task_item_phrase,
      additional_words: 'This is the end',
      audio: File.open(fixture_file('audio.mp3'))
    )

    sign_in(student, scope: :student)
    post "/api/lessons/#{lesson.id}/session"
    get "/api/lessons/#{lesson.id}/tasks/#{task.id}"
  end

  specify 'task response includes full task details' do
    expect(json.task).to have_attributes(
      type: 'Tasks::ArrangeWords',
      title: task.name,
      subject: 'teach'
    )
  end

  specify 'task item has solution' do
    expect(json.task.items.first).to have_attributes(
      solution: task_item_phrase
    )
  end

  specify 'task item has audio' do
    expect(json.task.items.first.audio_url).to be_present
  end

  specify 'submit answer' do
    get "/api/lessons/#{lesson.id}/session"
    lesson_session_id = json[:lesson_session][:id]

    get "/api/lesson_sessions/#{lesson_session_id}/task_session"
    task_session_id = json[:task_session][:id]

    payload = {
      answer: [{
        task_item_id: task_item.id,
        words: %w[a b c]
      }]
    }

    expected_status(:ok) do
      put "/api/lesson_sessions/#{lesson_session_id}/task_sessions/#{task_session_id}/answer",
          params: payload.to_json, headers: { 'Content-Type' => 'application/json' }
    end
  end
end
