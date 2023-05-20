# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Reward API', type: :request do
  let(:language) { create(:language) }
  let(:student) { create(:student) }
  let(:earned_reward) { create(:reward, language: language, kind: :badge, dimension: :word, value: 1) }
  let(:upcoming_reward1) { create(:reward, language: language, kind: :badge, dimension: :word, value: 2) }
  let(:upcoming_reward2) { create(:reward, language: language, kind: :badge, dimension: :word, value: 3) }

  describe 'get rewards' do
    before do
      create(:student_reward, student: student, reward: earned_reward)
      sign_in(student, scope: :student)
      get '/api/rewards'
    end

    specify 'succeeds' do
      expect(response.status).to eq(200)
    end

    specify 'it returns list of rewards' do
      expect(json.rewards.length).to eq(1)
    end

    specify 'it returns earned reward' do
      expect(json.rewards[0]).to have_attributes(
        id: earned_reward.id,
        name: earned_reward.name,
        kind: earned_reward.kind,
        dimension: earned_reward.dimension,
        value: earned_reward.value,
        image_url: earned_reward.image_url,
        language_code: language.code
      )
    end
  end

  describe 'get upcoming rewards' do
    before do
      upcoming_reward1
      upcoming_reward2
      sign_in(student, scope: :student)
      get '/api/rewards/upcoming'
    end

    specify 'succeeds' do
      expect(response.status).to eq(200)
    end

    specify 'it returns list of upcoming rewards' do
      expect(json.rewards.length).to eq(2)
    end

    specify 'it returns upcoming reward1' do
      expect(json.rewards[0]).to have_attributes(
        id: upcoming_reward1.id,
        name: upcoming_reward1.name,
        kind: upcoming_reward1.kind,
        dimension: upcoming_reward1.dimension,
        value: upcoming_reward1.value,
        image_url: upcoming_reward1.image_url,
        language_code: language.code
      )
    end

    specify 'it returns upcoming reward2' do
      expect(json.rewards[1]).to have_attributes(
        id: upcoming_reward2.id,
        name: upcoming_reward2.name,
        kind: upcoming_reward2.kind,
        dimension: upcoming_reward2.dimension,
        value: upcoming_reward2.value,
        image_url: upcoming_reward2.image_url,
        language_code: language.code
      )
    end
  end
end
