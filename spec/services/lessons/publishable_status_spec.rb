# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Lessons::PublishableStatus do
  subject(:result) { described_class.new(lesson).call }

  let(:user) { create(:user) }
  let(:lesson) { create(:lesson, author: user) }

  context 'when no conditions are met' do
    let(:failed_expectations) do
      [
        false,
        {
          user_profile: false,
          user_credits: true,
          lesson_glossary: false,
          lesson_approval: false
        }
      ]
    end

    it 'fails' do
      expect(result).to eq(failed_expectations)
    end
  end

  context 'with all conditions met' do
    let(:review) { create(:lesson_review, lesson: lesson) }
    let(:phrases) { %w[some random phrases just tekst lang requirement of lesson en having 10 phrases per lesson skole] }
    let(:tagger_result) do
      { 'phrases_hash' => { 'some' => 1, 'random' => 1, 'just' => 1, 'tekst' => 1, 'lang' => 1, 'requirement' => 1,
                            'of' => 1, 'lesson' => 2, 'en' => 1, 'having' => 1, 'per' => 1, 'skole' => 1 },
        'phrase_word_class' => { 'some' => 'PROPN', 'random' => 'NOUN.Ind.Masc.Sing', 'phrases' => 'X', 'just' => 'ADV',
                                 'tekst' => 'NOUN.Ind.Fem.Sing', 'lang' => 'ADJ.Ind.Pos.Sing',
                                 'requirement' => 'NOUN.Ind.Neut.Plur', 'of' => 'ADP', 'lesson' => 'NOUN.Ind.Masc.Sing',
                                 'en' => 'DET.Masc.Sing.Art', 'having' => 'NOUN.Ind.Fem.Sing', '10' => 'NUM.Plur.Card',
                                 'per' => 'ADP', 'skole' => 'NOUN.Ind.Masc.Sing' } }
    end

    let(:success_expectations) do
      [
        true,
        {
          user_profile: true,
          user_credits: true,
          lesson_glossary: true,
          lesson_approval: true
        }
      ]
    end

    before do
      # credits
      user.update(credits: 10)
      user.about = 'Something about myself'
      user.avatar = File.open(Rails.root.join('spec', 'fixtures', 'files', 'avatar.png'), 'rb')

      # sufficient glossary
      allow_any_instance_of(Admin::Dictionary::TreeTagger).to receive(:run_treetagger).and_return(tagger_result)
      Teach::LessonPhrases::Cases::Store.call(lesson: lesson, phrases: phrases, course: nil)

      # approved review
      review
    end

    it 'success' do
      expect(result).to eq(success_expectations)
    end
  end
end
