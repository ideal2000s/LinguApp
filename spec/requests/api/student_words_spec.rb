# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Gameplay API', type: :request do
  let(:student) { create(:student) }
  let(:word) { create(:dictionary_word) }
  let(:solved) { true }

  describe '#play' do
    before do
      sign_in(student, scope: :student)
      post "/api/words/#{word.id}/student_words/play", params: { solved: solved }
    end

    context 'with invalid params' do
      let(:solved) { nil }

      specify 'succeeds' do
        expect(response.status).to eq(422)
      end
    end

    context 'when solved is false' do
      let(:solved) { false }

      specify 'succeeds' do
        expect(response.status).to eq(200)
      end
    end

    context 'without existing student word' do
      specify 'succeeds' do
        expect(response.status).to eq(200)
      end
    end

    context 'with existing student word' do
      let(:student_word) { create(:student_word, student: student, word: word) }

      specify 'succeeds' do
        expect(response.status).to eq(200)
      end
    end
  end
end
