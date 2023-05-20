# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Skills API', type: :request do
  fixtures :skills
  before { request }

  describe 'languages to learn' do
    subject(:request) { get '/api/skills' }

    specify 'returns list of lessons' do
      expect(json.skills.size).to eq(3)
    end

    specify 'it should only return active language' do
      expect(json.skills.first).to have_attributes({ name: 'Reading' })
    end
  end
end
