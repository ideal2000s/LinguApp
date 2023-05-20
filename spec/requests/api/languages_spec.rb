# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Languages API', type: :request do
  before { request }

  describe 'languages to learn' do
    subject(:request) { get '/api/languages/active' }

    specify 'returns list of lessons' do
      expect(json.length).to eq(1)
    end

    specify 'it should only return active language' do
      expect(json.first).to have_attributes({ code: 'en' })
    end
  end

  describe 'user languages' do
    subject(:request) { get '/api/languages' }

    specify 'returns list of lessons' do
      expect(json.length).to eq(2)
    end

    specify 'it should only return active language' do
      expect(json.first).to have_attributes({ code: 'da' })
    end
  end
end
