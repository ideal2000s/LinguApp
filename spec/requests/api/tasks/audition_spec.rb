# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API - Audition', type: :request do
  let(:student) { create(:student, locale: :en) }
  let(:lesson) { create(:lesson, :published, tasks: [task]) }
  let(:task) { create(:audition_task, subject: :engage) }
  let(:task_item) { create(:audition_item, task: task, start: 0, word: word) }
  let(:word) { create(:dictionary_word, language: lesson.language, body: 'lives') }
  let(:similar_word) { create(:dictionary_word, language: lesson.language, body: 'lives') }

  before do
    lesson.phrases << similar_word
    task_item

    sign_in(student, scope: :student)
    post "/api/lessons/#{lesson.id}/session"
    get "/api/lessons/#{lesson.id}/tasks/#{task.id}"
  end

  specify 'task item has start' do
    expect(json.task.items.first).to respond_to(:start)
  end

  specify 'task item has correct word' do
    expect(json.task.items.first.correct_word).to have_attributes(
      body: word.body, word_class: word.word_class, image: nil
    )
  end

  specify 'task item has similar word' do
    expect(json.task.items.first.words.first).to have_attributes(
      body: similar_word.body, word_class: similar_word.word_class, image: nil
    )
  end
end
