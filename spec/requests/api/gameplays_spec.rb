# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Gameplay API', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published) }
  let(:word) { create(:dictionary_word, language: lesson.language) }
  let(:gameplay) { create(:gameplay) }

  describe '#create' do
    before do
      lesson.phrases << word

      sign_in(student, scope: :student)
      post "/api/lessons/#{lesson.id}/gameplays"
    end

    specify 'gameplay has id' do
      expect(json.gameplay).to respond_to(:id)
    end

    specify 'gameplay has game type' do
      expect(Games.constants.map(&:to_s)).to include(json.gameplay.game_type)
    end

    specify 'returns words array' do
      first_word = json.words.first

      expect(first_word.body).to eq(word.body)
    end
  end

  describe '#finish' do
    before do
      sign_in(student, scope: :student)
      put "/api/lessons/#{lesson.id}/gameplays/#{gameplay.id}/finish",
          params: { gameplay: { time_spent: 120, xp_earned: 5, attempts: 10 } }
    end

    specify 'succeeds' do
      expect(response.status).to eq(200)
    end
  end
end
