# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Lesson API', type: :request do
  let(:lesson) { create(:lesson, :published) }
  let(:language) { create(:language) }
  let(:student) { create(:student) }

  describe 'lesson with id' do
    context 'with unpublished lesson' do
      let(:lesson) { create(:lesson) }

      before { get "/api/lessons/#{lesson.id}" }

      specify 'renders error' do
        expect(response.status).to eq(404)
      end
    end

    context 'with unauthorized access' do
      before { get "/api/lessons/#{lesson.id}" }

      specify 'returns lesson' do
        expect(json.lesson).to have_attributes(id: lesson.id)
      end

      specify 'does not return lesson_session' do
        expect(json.lesson_session).to eq(nil)
      end
    end

    context 'with authorized access' do
      before do
        sign_in(student, scope: :student)
        get "/api/lessons/#{lesson.id}"
      end

      specify 'succeeds' do
        expect(response.status).to eq(200)
      end

      specify 'returns lesson data' do
        expect(json.lesson).to have_attributes(id: lesson.id)
      end
    end
  end

  describe 'lesson phrases' do
    before do
      sign_in(student, scope: :student)
      lesson.lesson_phrases.create(phrase_id: dictionary_word.id)
      allow(EasyTranslate).to receive(:translate).and_return('translated string')
    end

    let(:dictionary_word) { create(:dictionary_word, language: language) }

    context 'when student_word exists' do
      before do
        create(:student_word, student: student, word: dictionary_word)
        get "/api/lessons/#{lesson.id}/phrases"
      end

      specify 'succeeds' do
        expect(response.status).to eq(200)
      end

      specify 'returns lesson phrases' do
        expect(json.lesson_phrases).to be_present
      end

      specify 'returns 1 lesson phrase' do
        expect(json.lesson_phrases.count).to eq(1)
      end

      specify 'returns lesson phrases with student_word' do
        expect(json.lesson_phrases[0].student_word).to be_present
      end
    end

    context 'when student_word not exist' do
      before do
        get "/api/lessons/#{lesson.id}/phrases"
      end

      specify 'succeeds' do
        expect(response.status).to eq(200)
      end

      specify 'returns lesson phrases' do
        expect(json.lesson_phrases).to be_present
      end

      specify 'returns 1 lesson phrase' do
        expect(json.lesson_phrases.count).to eq(1)
      end

      specify 'returns lesson phrases with student_word' do
        expect(json.lesson_phrases[0].student_word).to be_nil
      end
    end
  end
end
