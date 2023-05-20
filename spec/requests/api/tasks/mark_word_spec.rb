# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published, tasks: [task]) }
  let(:task) { create(:mark_word_task, subject: :teach) }
  let(:task_item) { create(:mark_word_item, task: task, statement: 'Bilberries, also *lives* black berries in soils') }
  let(:word) { create :dictionary_word, language: lesson.language, body: 'lives' }

  before do
    allow(EasyTranslate).to receive(:translate).and_return('ord')
    word
    task_item

    sign_in(student, scope: :student)
    post "/api/lessons/#{lesson.id}/session"
    get "/api/lessons/#{lesson.id}/tasks/#{task.id}"
  end

  specify 'task item has solution' do
    expect(json.task.items.first).to respond_to(:statement)
  end
end
