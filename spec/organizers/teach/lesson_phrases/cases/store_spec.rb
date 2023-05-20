# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::LessonPhrases::Cases::Store do
  before do
    allow_any_instance_of(Admin::Dictionary::TreeTagger).to receive(:run_treetagger).and_return(tagger_result)
  end

  let(:language) { create(:language) }
  let(:team) { create(:team) }
  let(:lesson) { create(:lesson) }
  let(:tagger_result) do
    { 'phrases_hash' => { 'beta' => 1 }, 'phrase_word_class' => { 'alpha' => 'X', 'beta' => 'VERB.Imp.Fin' } }
  end

  context 'when course is not defined' do
    subject(:result) { described_class.call(lesson: lesson, phrases: %w[alpha beta], course: nil) }

    it 'stores phrases to lesson' do
      expect { result }.to change(LessonPhrase, :count).by(1)
    end
  end

  context 'when course is defined' do
    subject(:result) { described_class.call(lesson: lesson, phrases: %w[alpha beta], course: course) }

    before do
      previous_lesson.update!(course_section: course_section1)
      lesson.update!(course_section: course_section2)

      previous_lesson_word
    end

    let(:previous_lesson) { create(:lesson) }
    let(:word_beta) { create(:dictionary_word, body: 'beta', language: language) }
    let(:course) { create(:course, :published, language: language, team: team, author: team.owner, title: Faker::Lorem.sentence) }
    let(:course_section1) { create(:course_section, course: course) }
    let(:course_section2) { create(:course_section, course: course) }
    let(:previous_lesson_word) { create(:lesson_phrase, lesson: previous_lesson, phrase: word_beta) }

    it 'skips existing words in previous lessons in the same course' do
      expect { result }.to change(LessonPhrase, :count).by(0)
    end
  end

  context 'with phrases_count' do
    let(:tree_tagger) { instance_double(Admin::Dictionary::TreeTagger, call: true) }
    let(:word_importer) { instance_double(Admin::Dictionary::WordImporter, call: true) }

    before do
      allow(Admin::Dictionary::TreeTagger).to receive(:new).and_return(tree_tagger)
      allow(Admin::Dictionary::WordImporter).to receive(:new).and_return(word_importer)
      create(:lesson_phrase, lesson: lesson, phrase: create(:dictionary_word))
    end

    it 'resets phrases_count' do
      described_class.call(lesson: lesson, phrases: [], course: nil)
      expect(lesson.reload.phrases_count).to eq(0)
    end
  end
end
